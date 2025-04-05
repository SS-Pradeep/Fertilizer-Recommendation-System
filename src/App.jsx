import {  useState } from "react";



import "./App.css"
const App = ()=>{
  /*const [message, setMessage] = useState("");  // Stores user input
  const [responseMessage, setResponseMessage] = useState(""); // Stores backend response

  // Function to send a POST request to the backend
  const handleSubmit = async () => {
      try {
          const response = await fetch("http://localhost:5000/api/message", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ message }), // Send message as JSON
          });

          if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          const data = await response.json(); // Get response from backend
          setResponseMessage(data.message); // Update UI with response
      } catch (error) {
          console.error("Fetch failed:", error);
          setResponseMessage("Failed to send message");
      }
  };*/
    //const [features, setFeatures] = useState("");
    const cropmapping = {'Sugarcane': 15, 'Jowar': 6, 'Cotton': 1, 'Rice': 13, 'Wheat': 19, 'Groundnut': 5, 'Maize': 7, 'pigeonpeas': 20, 'Urad': 18, 'Moong': 10, 'Gram': 3, 'Masoor': 8, 'Soybean': 14, 'Ginger': 2, 'Turmeric': 17, 'Grapes': 4, 'Tobacco': 16, 'Barley': 0, 'Millets': 9, 'Oil seeds': 11, 'Pulses': 12};


    const [nitrogen, setnitrogen] = useState("");
    const [phosphorous,setphos] = useState("");
    const [potassium, setpotas] = useState("");
    const [ph,setph] = useState("");
    const [prediction, setPrediction] = useState("");
    const [crop,setcrop] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit called");
        const encodedcrop = cropmapping[crop];
        let features = [Number(nitrogen), Number(phosphorous), Number(potassium), Number(ph), encodedcrop];
        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({features}),
            });

            if (!response.ok) throw new Error("Error in prediction");

            const data = await response.json();
            setPrediction(data.prediction || "No predict");
            console.log(data.prediction);
        } catch (error) {
            console.error("Prediction failed:", error);
            setPrediction("Error getting prediction");
        }
    };
    const handlereset = async (e) => {
        
            setnitrogen("");
            setphos("");
            setpotas("");
            setph("");
            
            setcrop("");
            setPrediction("");
          
    };

  return (
      <div>
          
          <div className="container">
                <h2>Fertilizer Recommendation Form</h2>
                <form>
                    <table>
                        <tbody>
                        <tr>
                            <td><label className="nitrogen">Nitrogen (N)</label></td>
                            <td><input type="number"  value={nitrogen} max="500" placeholder="Enter Nitrogen" min="0" step="0.01" onChange={(e)=>setnitrogen(e.target.value)}></input></td>
                        </tr>
                        </tbody>
                        <tbody>
                        
                        <tr>
                            <td><label className="phosphorous">Phosphorous (P)</label></td>
                            <td><input type="number" value={phosphorous} max="500" placeholder="Enter Phosphorous" min="0" step="0.01" onChange={(e)=>setphos(e.target.value)}></input></td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <td><label className="potassium">Potassium (K)</label></td>
                            <td><input type="number" value={potassium} max="500" placeholder="Enter Potassium" min="0" step="0.01" onChange={(e)=>setpotas(e.target.value)}></input></td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <td><label className="ph-value">pH Value</label></td>
                            <td><input type="number" value={ph} placeholder="Enter pH Value" min="0" step="0.01" onChange={(e)=>setph(e.target.value)}></input></td>
                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <td><label className="crop">Crop</label></td>
                            <td>
                            <select value={crop} onChange={(e) => setcrop(e.target.value)}>
                                <option value="" >Select Crop</option>
                                <option value="Wheat">Wheat</option>
                                <option value="Rice">Rice</option>
                                <option value="Jowar">Jowar</option>
                                <option value="Cotton">Cotton</option>
                                <option value="Groundnut">Groundnut</option>
                                <option value="Millets">Millets</option>
                                <option value="Sugarcane">Sugarcane</option>
                                <option value="pigeonpeas">pigeonpeas</option>
                                <option value="Ginger">Ginger</option>
                                <option value="Oil seeds">Oil seeds</option>
                                <option value="Pulses">Pulses</option>
                                <option value="Barley">Barley</option>
                                <option value="Soybean">Soybean</option>
                                <option value="Tobacco">Tobacco</option>
                                <option value="Gram">Gram</option>
                                <option value="Grapes">Grapes</option>
                                <option value="Turmeric">Turmeric</option>
                                <option value="Moong">Moong</option>
                                <option value="Urad">Urad</option>
                                <option value="Maize">Maize</option>

                            </select>
</td>

                        </tr>
                        </tbody>
                        <tbody>
                        <tr>
                            <td colSpan="2">
                                <button type="submit" onClick={handleSubmit}>Submit</button>
                                <button type="reset" onClick={handlereset}>Reset</button>
                            </td>
                            
                        </tr>
                        </tbody>
                    </table>
                </form>
                <p>Fertilizer Recommended: {prediction}</p>
            </div>
            
           
          
          
      </div>
  );
  /*const [data,setdata] = useState("");

  const handle = async()=>{
    const response = await Axios.get("http://localhost:5173/data");
    setdata(data);
  }

 
  /*const [num1,setnum1] = useState("");
  const [num2,setnum2] = useState("");
  const [prediction,setprediction] = useState("");


  const handlesubmit = async()=>{
    try{
      const response = await axios.post("http://localhost:5173/predict",{
        num1 : parseFloat(num1),
        num2 : parseFloat(num2)
      });
      setprediction(response.data.prediction);
    }
    catch(error)
    {
      console.log("error");
    }
  }*/
    /*const [message, setMessage] = useState("Loading...");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/message");
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setMessage(data.message);
            } catch (error) {
                console.error("Fetch failed:", error);
                setMessage("Failed to load message");
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Backend Message:</h1>
            <p>{message}</p>
        </div>
    );
 return(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/find" element={<Find/>}/>
    </Routes>
  </Router>
 )*/
}


export default App