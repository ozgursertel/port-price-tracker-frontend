// AddCity.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { addCity } from '../services/cityService';
import { getCountries } from '../services/countryService';

const AddCity = () => {
  const [name, setName] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        const options = response.data.map(country => ({
          value: country.id,
          label: country.name
        }));
        setCountries(options);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCountry) {
      alert('Please select a country');
      return;
    }

    const cityData = {
      name,
      country: {
        id: selectedCountry.value,
        name: selectedCountry.label
      }
    };

    try {
      await addCity(cityData);
      alert('City added successfully');
      setName('');
      setSelectedCountry(null);
    } catch (error) {
      console.error('Error adding city:', error);
      alert('Error adding city');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add City</h2>
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
        <div className="form-group">
          <label>Country</label>
          <Select
            value={selectedCountry}
            onChange={setSelectedCountry}
            options={countries}
            placeholder="Select a country"
            isClearable
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add City
        </button>
      </form>
    </div>
  );
};

export default AddCity;
