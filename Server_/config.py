class Config:
    """Central configuration for the Flask prediction service."""

    MODEL_PATH = "model.pkl"
    LABEL_ENCODER_PATH = "label_encoder.pkl"
    FEATURE_COLUMNS = ["Nitrogen", "Phosphorus", "Potassium", "pH", "Crop"]
    PORT = 5001
    DEBUG = True
