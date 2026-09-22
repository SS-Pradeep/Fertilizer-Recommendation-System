import "./App.css";
import FertilizerForm from "./components/FertilizerForm";
import { useFertilizerForm } from "./hooks/useFertilizerForm";

const App = () => {
    const { form, prediction, updateField, handleSubmit, handleReset } = useFertilizerForm();

    return (
        <div>
            <FertilizerForm
                form={form}
                prediction={prediction}
                updateField={updateField}
                onSubmit={handleSubmit}
                onReset={handleReset}
            />
        </div>
    );
};

export default App;
