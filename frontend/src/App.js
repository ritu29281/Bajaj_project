import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const payload = JSON.parse(jsonInput);
      const res = await axios.post("http://localhost:3000/bfhl", payload); // Replace with your deployed backend URL
      setResponse(res.data);
    } catch (err) {
      alert("Invalid JSON or API Error");
    }
  };

  const options = [
    { value: "numbers", label: "Numbers" },
    { value: "alphabets", label: "Alphabets" },
    {
      value: "highest_lowercase_alphabet",
      label: "Highest Lowercase Alphabet",
    },
  ];

  const handleFilterChange = (selectedOptions) => {
    setFilterOptions(selectedOptions.map((opt) => opt.value));
  };

  const renderResponse = () => {
    if (!response) return null;
    return filterOptions.map((key) => (
      <div key={key}>
        <h3>{key}</h3>
        <p>{JSON.stringify(response[key])}</p>
      </div>
    ));
  };

  return (
    <div>
      <h1>ABCD123</h1>
      <textarea
        placeholder="Enter JSON"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      <Select isMulti options={options} onChange={handleFilterChange} />
      <div>{renderResponse()}</div>
    </div>
  );
}

export default App;
