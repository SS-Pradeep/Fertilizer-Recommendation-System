const express = require('express');
const cors = require('cors');
const axios = require("axios")
const app = express();
const PORT = 5000;

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type'
};

app.use(cors(corsOptions));


app.use(express.json());

app.post('/predict',async (req,res)=>{
    try{
        const flaskresponse = await axios.post("http://127.0.0.1:5001/predict", req.body); 

        return res.json(flaskresponse.data)
    }
    catch (error) {
        console.error("Error calling Flask API:", error);
        res.status(500).json({ error: "Failed to get prediction" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
