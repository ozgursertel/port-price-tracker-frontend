import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPorts, updatePort, deletePort } from '../services/portService';
import 'bootstrap/dist/css/bootstrap.min.css';

const Ports = () => {
  const [ports, setPorts] = useState([]);
  const [editingPort, setEditingPort] = useState(null);
  const [portData, setPortData] = useState({ name: '', unLoCode: '' });

  useEffect(() => {
    fetchPorts();
  }, []);

  const fetchPorts = () => {
    getPorts()
      .then(response => {
        setPorts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the port data!', error);
      });
  };

  const handleDelete = (id) => {
    deletePort(id)
      .then(() => {
        fetchPorts(); // Refresh the list after deletion
      })
      .catch(error => {
        console.error('There was an error deleting the port!', error);
      });
  };

  const handleEdit = (port) => {
    setEditingPort(port);
    setPortData({ name: port.name, unLoCode: port.unLoCode });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setPortData({ ...portData, [name]: value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updatePort(editingPort.id, portData)
      .then(() => {
        setEditingPort(null);
        fetchPorts(); // Refresh the list after updating
      })
      .catch(error => {
        console.error('There was an error updating the port!', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Ports</h2>
      
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>UNLOCODE</th>
            <th>City</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ports.map(port => (
            <tr key={port.id}>
              <td>{port.name}</td>
              <td>{port.unLoCode}</td>
              <td>{port.city.name}</td>
              <td>{port.city.country.name}</td>
              <td>
                <button className="btn btn-warning mr-2" onClick={() => handleEdit(port)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(port.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link className="btn btn-success mb-3" to="/add">Add Port</Link>

      {editingPort && (
        <div className="mt-5">
          <h2>Edit Port</h2>
          <form onSubmit={handleUpdateSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={portData.name}
                onChange={handleUpdateChange}
              />
            </div>
            <div className="form-group">
              <label>UNLOCODE</label>
              <input
                type="text"
                name="unLoCode"
                className="form-control"
                value={portData.unLoCode}
                onChange={handleUpdateChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Update Port</button>
            <button type="button" className="btn btn-secondary ml-2" onClick={() => setEditingPort(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Ports;
