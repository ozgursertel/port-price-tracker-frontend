import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCountries, getCitiesByCountry } from '../services/countryService';
import { getCityById } from '../services/cityService';
import { addPort } from '../services/portService';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPort = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [portData, setPortData] = useState({ name: '', unLoCode: '' });

  const navigate = useNavigate();

  useEffect(() => {
    getCountries()
      .then(response => setCountries(response.data))
      .catch(error => console.error('There was an error fetching the countries!', error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      getCitiesByCountry(selectedCountry)
        .then(response => setCities(response.data))
        .catch(error => console.error('There was an error fetching the cities!', error));
    }
  }, [selectedCountry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPortData({ ...portData, [name]: value });
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setCities([]); 
    setSelectedCity(''); 
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const cityResponse = await getCityById(selectedCity);
      const city = cityResponse.data;

      const payload = {
        name: portData.name,
        unLoCode: portData.unLoCode,
        city: {
          id: city.id,
          name: city.name,
          country: {
            id: city.country.id,
            name: city.country.name,
          },
        },
      };

      console.log("Submitting payload:", payload);

      const response = await addPort(payload);
      console.log("Response from server:", response.data);
      navigate('/ports');
    } catch (error) {
      console.error('There was an error adding the port!', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Port</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={portData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>UNLOCODE</label>
          <input
            type="text"
            name="unLoCode"
            className="form-control"
            value={portData.unLoCode}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Country</label>
          <select
            className="form-control"
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select a country</option>
            {countries.map(country => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>City</label>
          <select
            className="form-control"
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedCountry}
          >
            <option value="">Select a city</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Port</button>
      </form>
    </div>
  );
};

export default AddPort;
