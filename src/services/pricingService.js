// services/pricingService.js
import axiosInstance from './axiosInstance';

const getPricing = () => {
  return axiosInstance.get('/pricing');
};

const addPricing = (pricingData) => {
  return axiosInstance.post('/pricing/add', pricingData);
};

const deletePricing = (pricingId) => {
  return axiosInstance.delete(`/pricing/${pricingId}`);
};

const getPricingByPorts = (portOfDischargeId, portOfLoadingId) => {
  return axiosInstance.get(`/pricing/ports`, {
    params: { podID: portOfDischargeId, polID: portOfLoadingId }
  });
};

const getPricingByPortsAndDate = (portOfDischargeId, portOfLoadingId, fromDate, toDate) => {
  return axiosInstance.get(`/pricing/date`, {
    params: {
      podID: portOfDischargeId,
      polID: portOfLoadingId,
      fDate: fromDate,
      lDate: toDate
    }
  })
};

export { getPricing, addPricing, deletePricing, getPricingByPorts,getPricingByPortsAndDate};
