import { useState } from "react";
import { CROP_MAPPING } from "../constants/cropOptions";
import { fetchFertilizerPrediction } from "../services/fertilizerApi";

const INITIAL_FORM_STATE = {
    nitrogen: "",
    phosphorous: "",
    potassium: "",
    ph: "",
    crop: "",
};

export function useFertilizerForm() {
    const [form, setForm] = useState(INITIAL_FORM_STATE);
    const [prediction, setPrediction] = useState("");

    const updateField = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nitrogen, phosphorous, potassium, ph, crop } = form;
        const encodedCrop = CROP_MAPPING[crop];
        const features = [Number(nitrogen), Number(phosphorous), Number(potassium), Number(ph), encodedCrop];

        try {
            const data = await fetchFertilizerPrediction(features);
            setPrediction(data.prediction || "No predict");
        } catch (error) {
            console.error("Prediction failed:", error);
            setPrediction("Error getting prediction");
        }
    };

    const handleReset = async () => {
        setForm(INITIAL_FORM_STATE);
        setPrediction("");
    };

    return { form, prediction, updateField, handleSubmit, handleReset };
}
