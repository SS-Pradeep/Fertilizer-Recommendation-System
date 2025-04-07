from flask import Flask,request,jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
CORS(app)

model = joblib.load("model.pkl")
label_encoder = joblib.load("label_encoder.pkl")

@app.route("/")
def Home():
    return "Ml is running"

#store label encoder in a binary option

@app.route("/predict",methods = ["POST"])
def predict():
    try:
        print("Data receiveed")
        data = request.get_json()
        print("Received Data",data)

        if "features" not in data:
            return jsonify({"error": "Missing 'features' key in request"}), 400

        features = np.array(data["features"]).reshape(1, -1)
        print("Features reshaped:", features)

        column_names = ["Nitrogen", "Phosphorus", "Potassium", "pH", "Crop"] 
        features_df = pd.DataFrame(features, columns=column_names)
        print("Features DataFrame:\n", features_df)

        if model is None:
            return jsonify({"error": "Model is not loaded"}), 500

        print("Model is predicting...")
        prediction = model.predict(features_df)[0] 
        print("Raw prediction:", prediction)
        

        decoded_prediction = label_encoder.inverse_transform([int(prediction)])[0]
        print("Decoded prediction:", decoded_prediction)

        print(decoded_prediction[0])
        return jsonify({"prediction": decoded_prediction})


    except Exception as e:
        return jsonify({"error": str(e)}), 500  

if __name__ == "__main__":
    app.run(debug=True,port=5001)

    