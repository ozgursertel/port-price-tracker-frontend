// services/containerService.js
import axiosInstance from './axiosInstance';

const getContainers = () => {
  return axiosInstance.get('/containers');
};

export { getContainers };
