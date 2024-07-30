// services/portService.js
import axiosInstance from './axiosInstance';

const getPorts = () => {
  return axiosInstance.get('/port');
};

const addPort = (portData) => {
  return axiosInstance.post('/port', portData);
};

const updatePort = (portId, portData) => {
  return axiosInstance.put(`/port/${portId}`, portData);
};

const deletePort = (portId) => {
  return axiosInstance.delete(`/port/${portId}`);
};

export { getPorts, addPort, updatePort, deletePort };
