import React, { useState } from "react";
import { addCountry } from "../services/countryService";

const AddCountry = () => {
  const [name, setName] = useState("");
  const handleSubmit =async (e) =>{
    e.preventDefault();
    try {
        const countryData = { name};
        await addCountry(countryData);
        alert('Country added successfully');
        setName('');
      } catch (error) {
        console.error('Error adding country:', error);
        alert('Error adding country');
      }
    };
  return (
    <div className="container mt-5">
      <h2>Add Country</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Country
        </button>
      </form>
    </div>
  );
};

export default AddCountry;
