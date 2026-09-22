const PREDICTION_ENDPOINT = "http://127.0.0.1:5000/predict";

export async function fetchFertilizerPrediction(features) {
    const response = await fetch(PREDICTION_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
    });

    if (!response.ok) throw new Error("Error in prediction");

    return response.json();
}
