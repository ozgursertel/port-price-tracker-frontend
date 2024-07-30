// services/carrierService.js
import axiosInstance from './axiosInstance';

const getCarriers = () => {
  return axiosInstance.get('/carrier');
};

export { getCarriers };
