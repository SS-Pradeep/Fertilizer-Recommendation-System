require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 5000,
    FLASK_PREDICT_URL: process.env.FLASK_PREDICT_URL || "http://127.0.0.1:5001/predict",
    CORS_OPTIONS: {
        origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type",
    },
};
