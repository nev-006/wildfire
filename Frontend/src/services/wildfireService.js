import api from './api';

const predictFire = async (data) => {
    try {
        const response = await api.post('/predict-fire', data);
        return response.data;
    } catch (error) {
        console.error("Error predicting fire:", error);
        throw error;
    }
};

const getAutofillData = async (payload) => {
    try {
        const response = await api.post('/autofill-data', payload);
        return response.data;
    } catch (error) {
        console.error("Error fetching autofill data:", error);
        throw error;
    }
};

export default {
    predictFire,
    getAutofillData
};
