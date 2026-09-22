import { CROP_OPTIONS } from "../constants/cropOptions";

const FertilizerForm = ({ form, prediction, updateField, onSubmit, onReset }) => {
    return (
        <div className="container">
            <h2>Fertilizer Recommendation Form</h2>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td><label className="nitrogen">Nitrogen (N)</label></td>
                            <td><input type="number" value={form.nitrogen} max="500" placeholder="Enter Nitrogen" min="0" step="0.01" onChange={updateField("nitrogen")} /></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><label className="phosphorous">Phosphorous (P)</label></td>
                            <td><input type="number" value={form.phosphorous} max="500" placeholder="Enter Phosphorous" min="0" step="0.01" onChange={updateField("phosphorous")} /></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><label className="potassium">Potassium (K)</label></td>
                            <td><input type="number" value={form.potassium} max="500" placeholder="Enter Potassium" min="0" step="0.01" onChange={updateField("potassium")} /></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><label className="ph-value">pH Value</label></td>
                            <td><input type="number" value={form.ph} placeholder="Enter pH Value" min="0" step="0.01" onChange={updateField("ph")} /></td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td><label className="crop">Crop</label></td>
                            <td>
                                <select value={form.crop} onChange={updateField("crop")}>
                                    <option value="">Select Crop</option>
                                    {CROP_OPTIONS.map((cropName) => (
                                        <option key={cropName} value={cropName}>{cropName}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                            <td colSpan="2">
                                <button type="submit" onClick={onSubmit}>Submit</button>
                                <button type="reset" onClick={onReset}>Reset</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <p>Fertilizer Recommended: {prediction}</p>
        </div>
    );
};

export default FertilizerForm;
