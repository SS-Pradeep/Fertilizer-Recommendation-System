import numpy as np
import pandas as pd


class FeatureProcessor:
    """Converts a raw feature list into the DataFrame shape the model expects."""

    def __init__(self, column_names):
        self._column_names = column_names

    def to_dataframe(self, raw_features):
        features = np.array(raw_features).reshape(1, -1)
        return pd.DataFrame(features, columns=self._column_names)
