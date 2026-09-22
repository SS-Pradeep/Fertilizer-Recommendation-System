import os


class Config:
    """Central configuration for the Flask prediction service."""

    MODEL_PATH = "model.pkl"
    LABEL_ENCODER_PATH = "label_encoder.pkl"
    FEATURE_COLUMNS = ["Nitrogen", "Phosphorus", "Potassium", "pH", "Crop"]
    PORT = int(os.environ.get("PORT", 5001))
    DEBUG = os.environ.get("FLASK_DEBUG", "true").lower() == "true"
