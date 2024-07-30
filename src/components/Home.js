import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [ports, setPorts] = useState([]);
  const [searchData, setSearchData] = useState({
    portOfDischarge: null,
    portOfLoading: null,
  });
  const [prices, setPrices] = useState([]);
  useEffect(()=>{
    fetchPorts();
  },[]);
  const fetchPorts = () =>{
    axios.get('http://portpricetracker-env.eba-jtfkf2ms.us-east-1.elasticbeanstalk.com/v1/api/port')
      .then(response => {
        setPorts(response.data.map(port => ({
          label: port.name,
          value: port.id
        })));
      })
      .catch(error => {
        console.error('There was an error fetching the ports!', error);
      });
  }

  const handleChange = (selectedOption, action) => {
    const { name } = action;
    setSearchData({
      ...searchData,
      [name]: selectedOption
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { portOfDischarge, portOfLoading } = searchData;
    if (portOfDischarge && portOfLoading) {
      axios.get(`http://portpricetracker-env.eba-jtfkf2ms.us-east-1.elasticbeanstalk.com/v1/api/pricing/ports?podID=${portOfDischarge.value}&polID=${portOfLoading.value}`)
        .then(response => {
          const sortedPrices = response.data.sort((a, b) => a.freightPrice - b.freightPrice);
          setPrices(sortedPrices);
        })
        .catch(error => {
          console.error('There was an error fetching the prices!', error);
        });
    }
  };


  return  (
    <div className="container mt-5">
      <h2>Search Prices</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Port of Loading</label>
          <Select
            name="portOfLoading"
            options={ports}
            value={searchData.portOfLoading}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Port of Discharge</label>
          <Select
            name="portOfDischarge"
            options={ports}
            value={searchData.portOfDischarge}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {prices.length > 0 && (
        <div className="mt-5">
          <h2>Prices</h2>
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
              </tr>
            </thead>
            <tbody>
              {prices.map(price => (
                <tr key={price.id}>
                  <td>{price.id}</td>
                  <td>{price.portOfLoading.name}</td>
                  <td>{price.portOfDischarge.name}</td>
                  <td>{price.containerType.type}</td>
                  <td>{price.carrier.name}</td>
                  <td>{price.freightPrice}</td>
                  <td>{price.localPrice}</td>
                  <td>{new Date(price.priceValidityDate).toLocaleDateString()}</td>
                  <td>{new Date(price.createdDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
