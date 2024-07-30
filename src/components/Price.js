import React, { useEffect, useState } from "react";
import {
  getPricing,
  deletePricing,
  getPricingByPortsAndDate,
} from "../services/pricingService";
import { getPorts } from "../services/portService";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

const Price = () => {
  const [prices, setPrices] = useState([]);
  const [ports, setPorts] = useState([]);
  const [selectedPol, setSelectedPol] = useState(null);
  const [selectedPod, setSelectedPod] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    fetchPorts();
    fetchPrices();
  }, []);

  const fetchPorts = () => {
    getPorts()
      .then((response) => {
        setPorts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the ports!", error);
      });
  };

  const fetchPrices = () => {
    getPricing()
      .then((response) => {
        setPrices(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the prices!", error);
      });
  };

  const handleDelete = (id) => {
    deletePricing(id)
      .then(() => {
        fetchPrices(); // Refresh the list after deletion
      })
      .catch((error) => {
        console.error("There was an error deleting the price!", error);
      });
  };

  const handleSearch = () => {
    if (selectedPol && selectedPod && fromDate && toDate) {

      getPricingByPortsAndDate(selectedPod.value, selectedPol.value, fromDate, toDate)
        .then((response) => {
          setPrices(response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the filtered prices!",
            error
          );
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Prices</h2>

      <div className="mb-4">
        <div className="row">
          <div className="col">
            <Select
              options={ports.map((port) => ({
                value: port.id,
                label: port.name,
              }))}
              onChange={setSelectedPol}
              placeholder="Select Port of Loading"
            />
          </div>
          <div className="col">
            <Select
              options={ports.map((port) => ({
                value: port.id,
                label: port.name,
              }))}
              onChange={setSelectedPod}
              placeholder="Select Port of Discharge"
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Port of Loading</th>
            <th>Port of Discharge</th>
            <th>Carrier</th>
            <th>Container Type</th>
            <th>Freight Price</th>
            <th>Local Price</th>
            <th>Price Validity Date</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {prices.map((price) => (
            <tr key={price.id}>
              <td>{price.id}</td>
              <td>{price.portOfLoading.name}</td>
              <td>{price.portOfDischarge.name}</td>
              <td>{price.carrier.name}</td>
              <td>{price.containerType.type}</td>
              <td>{price.freightPrice}</td>
              <td>{price.localPrice}</td>
              <td>{new Date(price.priceValidityDate).toLocaleDateString()}</td>
              <td>{new Date(price.createdDate).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(price.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Price;
