from flask import Flask, request, jsonify
from flask_cors import CORS

from config import Config
from feature_processor import FeatureProcessor
from model_service import ModelService

app = Flask(__name__)
CORS(app)

model_service = ModelService(Config.MODEL_PATH, Config.LABEL_ENCODER_PATH)
feature_processor = FeatureProcessor(Config.FEATURE_COLUMNS)


@app.route("/")
def home():
    return "Ml is running"


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()

        if "features" not in data:
            return jsonify({"error": "Missing 'features' key in request"}), 400

        if not model_service.is_ready:
            return jsonify({"error": "Model is not loaded"}), 500

        features_df = feature_processor.to_dataframe(data["features"])
        decoded_prediction = model_service.predict(features_df)

        return jsonify({"prediction": decoded_prediction})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=Config.PORT, debug=Config.DEBUG)
