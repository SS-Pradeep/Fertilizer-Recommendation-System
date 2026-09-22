const express = require("express");
const cors = require("cors");
const { CORS_OPTIONS } = require("./config");
const predictionRoutes = require("./routes/predictionRoutes");

const app = express();

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(predictionRoutes);

module.exports = app;
