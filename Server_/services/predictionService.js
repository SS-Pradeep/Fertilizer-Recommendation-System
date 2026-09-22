const axios = require("axios");
const { FLASK_PREDICT_URL } = require("../config");

class PredictionService {
    constructor(apiUrl = FLASK_PREDICT_URL) {
        this._apiUrl = apiUrl;
    }

    async getPrediction(payload) {
        const response = await axios.post(this._apiUrl, payload);
        return response.data;
    }
}

module.exports = PredictionService;
