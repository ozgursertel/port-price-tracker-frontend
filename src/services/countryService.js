// services/countryService.js
import axiosInstance from './axiosInstance';

const getCountries = () => {
  return axiosInstance.get('/country');
};

const getCitiesByCountry = (countryId) => {
  return axiosInstance.get(`/country/${countryId}/cities`);
};

const addCountry = (countryData) =>{
  return axiosInstance.post('/country',countryData)

}

export { getCountries, getCitiesByCountry ,addCountry};
