// services/cityService.js
import axiosInstance from './axiosInstance';

const getCityById = (cityId) => {
  return axiosInstance.get(`/city/${cityId}`);
};

const addCity = (cityData) => {
  return axiosInstance.post('/city', cityData);
};

export { getCityById,addCity };
