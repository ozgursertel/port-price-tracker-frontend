import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { getPorts } from '../services/portService';
import { getCarriers } from '../services/carrierService';
import { getContainers } from '../services/containerService';
import { addPricing } from '../services/pricingService';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddPricing = () => {
  const [ports, setPorts] = useState([]);
  const [carriers, setCarriers] = useState([]);
  const [containers, setContainers] = useState([]);
  const [pricingData, setPricingData] = useState({
    portOfDischarge: null,
    portOfLoading: null,
    carrier: null,
    container: null,
    freightPrice: '',
    localPrice: '',
    priceValidityDate: '',
    freeTime: '',
    transitTime: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchPorts();
    fetchCarriers();
    fetchContainers();
  }, []);

  const fetchPorts = () => {
    getPorts()
      .then(response => {
        setPorts(response.data.map(port => ({
          label: port.name,
          value: port.id
        })));
      })
      .catch(error => console.error('There was an error fetching the ports!', error));
  };

  const fetchCarriers = () => {
    getCarriers()
      .then(response => {
        setCarriers(response.data.map(carrier => ({
          label: carrier.name,
          value: carrier.id
        })));
      })
      .catch(error => console.error('There was an error fetching the carriers!', error));
  };

  const fetchContainers = () => {
    getContainers()
      .then(response => {
        setContainers(response.data.map(container => ({
          label: container.type,
          value: container.id
        })));
      })
      .catch(error => console.error('There was an error fetching the containers!', error));
  };

  const handleChange = (selectedOption, action) => {
    const { name } = action;
    setPricingData({
      ...pricingData,
      [name]: selectedOption
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPricingData({
      ...pricingData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      portOfDischarge: { id: pricingData.portOfDischarge.value },
      portOfLoading: { id: pricingData.portOfLoading.value },
      carrier: { id: pricingData.carrier.value },
      containerType: { id: pricingData.container.value },
      freightPrice: parseFloat(pricingData.freightPrice),
      localPrice: parseFloat(pricingData.localPrice),
      priceValidityDate: pricingData.priceValidityDate,
      freeTime: parseInt(pricingData.freeTime, 10),
      transitTime: parseInt(pricingData.transitTime, 10)
    };

    console.log("Submitting payload:", payload);

    addPricing(payload)
      .then(response => {
        console.log("Response from server:", response.data);
        navigate('/pricing');
      })
      .catch(error => console.error('There was an error adding the price!', error));
  };

  return (
    <div className="container mt-5">
      <h2>Add Pricing</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Port of Loading</label>
          <Select
            name="portOfLoading"
            options={ports}
            value={pricingData.portOfLoading}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Port of Discharge</label>
          <Select
            name="portOfDischarge"
            options={ports}
            value={pricingData.portOfDischarge}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Carrier</label>
          <Select
            name="carrier"
            options={carriers}
            value={pricingData.carrier}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Container</label>
          <Select
            name="container"
            options={containers}
            value={pricingData.container}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Freight Price</label>
          <input
            type="number"
            name="freightPrice"
            className="form-control"
            value={pricingData.freightPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Local Price</label>
          <input
            type="number"
            name="localPrice"
            className="form-control"
            value={pricingData.localPrice}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Price Validity Date</label>
          <input
            type="date"
            name="priceValidityDate"
            className="form-control"
            value={pricingData.priceValidityDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Free Time</label>
          <input
            type="number"
            name="freeTime"
            className="form-control"
            value={pricingData.freeTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Transit Time</label>
          <input
            type="number"
            name="transitTime"
            className="form-control"
            value={pricingData.transitTime}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Pricing</button>
      </form>
    </div>
  );
};

export default AddPricing;
