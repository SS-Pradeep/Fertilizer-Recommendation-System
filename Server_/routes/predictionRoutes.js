const express = require("express");
const PredictionService = require("../services/predictionService");

const router = express.Router();
const predictionService = new PredictionService();

router.post("/predict", async (req, res) => {
    try {
        const prediction = await predictionService.getPrediction(req.body);
        return res.json(prediction);
    } catch (error) {
        console.error("Error calling Flask API:", error);
        res.status(500).json({ error: "Failed to get prediction" });
    }
});

module.exports = router;
