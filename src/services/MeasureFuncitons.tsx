import AxiosProvider from '../hooks/ApiContext';

export const addMeasuresData = async (token: any, measure: any) => {
  try {
    const res = await AxiosProvider(token).post('/api/measures/add', measure);
    return res;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to add measure data';
    throw new Error(errorMessage);
  }
};

export const updateMeasuresData = async (token: any, measure: any) => {
  try {
    const res = await AxiosProvider(token).post('/api/measures/edit', measure);
    return res;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to update measure data';
    throw new Error(errorMessage);
  }
};

export const deleteMeasuresData = async (token: any, item: any) => {
  try {
    const res = await AxiosProvider(token).delete('/api/measures/delete/' + item._id);
    return res;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to delete measure data';
    throw new Error(errorMessage);
  }
};

export const fetchMeasuresData = async (token: any) => {
  try {
    const res = await AxiosProvider(token).get('/api/measures/get');
    return res;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch all measure data';
    throw new Error(errorMessage);
  }
};
