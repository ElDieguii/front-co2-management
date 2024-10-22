import AxiosProvider from '../hooks/ApiContext';

export const fetchTotalUsers = async (token: any) => {
  try {
    const response = await AxiosProvider(token).get(`/api/users/get`);
    return response;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response?.data?.message || 'Failed to fetch total Users data';
    throw new Error(errorMessage);
  }
};

export const addUser = async (token: any, userData: any) => {
  try {
    const response = await AxiosProvider(token).post(`/api/users/add`, userData);
    return response;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to save User data';
    throw new Error(errorMessage);
  }
};

export const updateUser = async (token: any, userData: any) => {
  try {
    const response = await AxiosProvider(token).put(`/api/users/edit`, userData);
    return response;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to update User data';
    throw new Error(errorMessage);
  }
};

export const deleteUser = async (token: any, userId: any) => {
  try {
    const response = await AxiosProvider(token).delete(`/api/users/delete/` + userId);
    return response;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to delete User data';
    throw new Error(errorMessage);
  }
};

export const fetchUserbyId = async (token: any, userId: any) => {
  try {
    const response = await AxiosProvider(token).get(`/api/users/get/` + userId);
    return response;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch User data by Id';
    throw new Error(errorMessage);
  }
};
