import AxiosProvider from '../hooks/ApiContext';

export const fetchTotalScopes = async (token: any, scope?: number) => {
  try {
    const response = await AxiosProvider(token).get(`/api/scopes/${scope}`);
    return response;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response?.data?.message || 'Failed to fetch total scopes data';
    throw new Error(errorMessage);
  }
};

export const addScope = async (token: any, scope: any, scopeData: any) => {
  try {
    const response = await AxiosProvider(token).post(`/api/scopes/${scope}`, scopeData);
    return response;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to save scope data';
    throw new Error(errorMessage);
  }
};

export const updateScope = async (token: any, scope: any, scopeData: any) => {
  try {
    const response = await AxiosProvider(token).put(`/api/scopes/${scope}/edit`, scopeData);
    return response;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to update scope data';
    throw new Error(errorMessage);
  }
};

export const deleteScope = async (token: any, scope: any, scopeId: any) => {
  try {
    const response = await AxiosProvider(token).delete(`/api/scopes/${scope}/delete/` + scopeId);
    return response;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Failed to delete scope data';
    throw new Error(errorMessage);
  }
};
