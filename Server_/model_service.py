import joblib


class ModelService:
    """Wraps the trained model and label encoder behind a simple predict() call."""

    def __init__(self, model_path, label_encoder_path):
        self._model = joblib.load(model_path)
        self._label_encoder = joblib.load(label_encoder_path)

    @property
    def is_ready(self):
        return self._model is not None

    def predict(self, features_df):
        prediction = self._model.predict(features_df)[0]
        return self._label_encoder.inverse_transform([int(prediction)])[0]
