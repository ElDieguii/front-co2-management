import { format } from 'date-fns';
import AxiosProvider from '../hooks/ApiContext';

const formatDate = (str: any) => {
  if (!str) return '';
  const parsedDate: any = new Date(str);
  if (isNaN(parsedDate)) {
    return '';
  }
  return format(parsedDate, 'yyyy-MM-dd');
};

export const fetchCompanyData = async (token: any, user: any, setCompanyData: any) => {
  try {
    const response = await AxiosProvider(token).get('/api/companies/get/' + user._id);
    const data = response.data;
    setCompanyData({
      _id: data._id,
      companyName: data.companyName ?? '',
      numEmployees: data.numEmployees ?? 0,
      annualSales: data.annualSales ?? 0,
      annualGrowth: data.annualGrowth ?? 0,
      reportTitle: data.reportTitle ?? '',
      observationPeriod: formatDate(data.observationPeriod),
      observationEnd: formatDate(data.observationEnd),
      observationObject: data.observationObject ?? '',
      description: data.description ?? '',
      region: data.region ?? '',
    });
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || 'Failed to fetch company data by userId';
    throw new Error(errorMessage);
  }
};

export const fetchAllCompanies = async (token: any) => {
  try {
    const response = await AxiosProvider(token).get('/api/companies/get/');
    return response;
  } catch (err: any) {
    const errorMessage = err.response?.data?.message || 'Failed to fetch ALL companies';
    throw new Error(errorMessage);
  }
};
