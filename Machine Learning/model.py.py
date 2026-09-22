# -*- coding: utf-8 -*-
"""
Fertilizer recommendation model training pipeline.

Refactored from the original Colab export (real.ipynb) into a class-based
pipeline that separates data loading, preprocessing, training and
persistence, while preserving the original training behavior and outputs.
"""

import pickle

import joblib
import matplotlib.pyplot as plt
import seaborn as sns
from imblearn.over_sampling import SMOTE
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

import pandas as pd


class DataLoader:
    """Loads the raw fertilizer dataset from disk."""

    def __init__(self, csv_path):
        self._csv_path = csv_path

    def load(self):
        return pd.read_csv(self._csv_path)


class ExploratoryAnalyzer:
    """Renders diagnostic boxplots for every column in the dataset."""

    @staticmethod
    def plot_boxplots(df):
        for column in df.columns:
            plt.figure(figsize=(10, 5))
            sns.boxplot(df[column])
            plt.show()


class DataPreprocessor:
    """Cleans the dataset and label-encodes its categorical columns.

    A single LabelEncoder instance is reused for both the Crop and
    Fertilizer columns (fit second on Fertilizer), matching the original
    pipeline so the saved encoder is the one app.py needs to decode
    predicted fertilizer labels.
    """

    def __init__(self):
        self.label_encoder = LabelEncoder()

    def clean(self, df):
        return df.dropna()

    def encode_crop(self, df):
        crop = df['Crop']
        df['Crop'] = self.label_encoder.fit_transform(df['Crop'])
        print(dict(zip(crop, df['Crop'])))
        return df

    def encode_fertilizer(self, df):
        df['Fertilizer'] = self.label_encoder.fit_transform(df['Fertilizer'])
        return df

    def save_label_encoder(self, path="label_encoder.pkl"):
        joblib.dump(self.label_encoder, path)
        print("LabelEncoder saved successfully!")


class ModelTrainer:
    """Trains and evaluates the RandomForest fertilizer classifiers."""

    FEATURE_COLUMNS = ['Nitrogen', 'Phosphorus', 'Potassium', 'pH', 'Crop']
    TARGET_COLUMN = ['Fertilizer']

    def train_baseline(self, df):
        x = df[self.FEATURE_COLUMNS]
        y = df[self.TARGET_COLUMN]
        x_train, x_test, y_train, y_test = train_test_split(
            x, y, train_size=0.8, test_size=0.15, random_state=10
        )

        model = RandomForestClassifier(
            n_estimators=100, max_depth=30, min_samples_split=2,
            min_samples_leaf=2, max_features='sqrt', random_state=40,
        )
        model.fit(x_train, y_train)

        y_pred = model.predict(x_test)
        print("Classification Report:\n", classification_report(y_test, y_pred))

        self._report_class_balance(y)

        return model, x, y

    @staticmethod
    def _report_class_balance(y):
        class_counts = y.count()
        majority_class = class_counts.idxmax()
        minority_class = class_counts.idxmin()
        ratio = class_counts[majority_class] / class_counts[minority_class]
        print(f"Imbalance Ratio (Majority:Minority): {ratio:.2f}")

    def train_balanced(self, x, y):
        x_train, x_test, y_train, y_test = train_test_split(
            x, y, test_size=0.2, random_state=42, stratify=y
        )

        smote = SMOTE(sampling_strategy='auto', random_state=42)
        x_resampled, y_resampled = smote.fit_resample(x_train, y_train)

        balanced_model = RandomForestClassifier(n_estimators=100, random_state=42)
        balanced_model.fit(x_resampled, y_resampled)

        y_pred = balanced_model.predict(x_test)
        accuracy = accuracy_score(y_test, y_pred)
        print(f"Accuracy: {accuracy:.4f}")
        print("Classification Report:\n", classification_report(y_test, y_pred))

        return balanced_model


class ModelPersister:
    """Handles saving and loading the trained model artifact."""

    @staticmethod
    def save(model, path="model.pkl"):
        with open(path, 'wb') as f:
            pickle.dump(model, f)

    @staticmethod
    def load(path="model.pkl"):
        with open(path, 'rb') as f:
            return pickle.load(f)


def main():
    loader = DataLoader("ht.csv")
    df = loader.load()

    preprocessor = DataPreprocessor()
    df = preprocessor.clean(df)

    ExploratoryAnalyzer.plot_boxplots(df)

    df = preprocessor.encode_crop(df)
    df = preprocessor.encode_fertilizer(df)
    preprocessor.save_label_encoder()

    df1 = df.copy()
    print(df1.describe())

    trainer = ModelTrainer()
    model, x, y = trainer.train_baseline(df1)
    trainer.train_balanced(x, y)

    # NOTE: preserves the original pipeline's behavior of persisting the
    # baseline `model`, not the SMOTE-balanced classifier trained above.
    ModelPersister.save(model)
    ModelPersister.load()


if __name__ == "__main__":
    main()
