module.exports = {
    PORT: 5000,
    FLASK_PREDICT_URL: "http://127.0.0.1:5001/predict",
    CORS_OPTIONS: {
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type",
    },
};
