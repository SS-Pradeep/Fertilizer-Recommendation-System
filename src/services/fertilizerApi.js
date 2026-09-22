const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const PREDICTION_ENDPOINT = `${API_BASE_URL}/predict`;

export async function fetchFertilizerPrediction(features) {
    const response = await fetch(PREDICTION_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
    });

    if (!response.ok) throw new Error("Error in prediction");

    return response.json();
}
