import AxiosProvider from '../hooks/ApiContext';
import { Search } from '../components/AdvanceCalculation/ClimatiqCalculation/ClimatiQCalculation';
import { getUnitCategory } from '../utils';
const CLIMATIQ_API_KEY = import.meta.env.VITE_REACT_API_CLIMATIQ;

export const fetchElectricityData = async (
  token: any,
  year: string,
  region: string,
  amount: any,
  unit_type: string,
  connection: string,
  source?: string
) => {
  const requestData = {
    year: parseInt(year),
    region: region,
    components: [
      {
        amount: {
          energy: parseInt(amount),
          energy_unit: unit_type,
        },
        connection_type: connection,
        energy_source: source || null,
      },
    ],
  };
  try {
    const response = await AxiosProvider(token).post(
      'https://preview.api.climatiq.io/energy/v1-preview1/electricity',
      requestData,
      {
        headers: {
          Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
        },
      }
    );
    return response.data.location;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response?.data?.message || 'Failed to fetch Electricity data';
    throw new Error(errorMessage);
  }
};

export const fetchHeatData = async (
  token: any,
  year: string,
  region: string,
  amount: any,
  unit_type: string,
  loss_factor?: string,
  source?: string
) => {
  const requestData = {
    year: parseInt(year),
    region: region,
    components: [
      {
        amount: {
          energy: parseInt(amount),
          energy_unit: unit_type,
        },
        loss_factor: loss_factor || null,
        energy_source: source || null,
      },
    ],
  };
  try {
    const response = await AxiosProvider(token).post(
      'https://preview.api.climatiq.io/energy/v1-preview1/heat',
      requestData,
      {
        headers: {
          Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
        },
      }
    );
    return response.data.estimates;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response?.data?.message || 'Failed to fetch Heat data';
    throw new Error(errorMessage);
  }
};

export const fetchFuelData = async (
  token: any,
  year: string,
  region: string,
  amount: any,
  unit_type: string,
  fuel_type: string
) => {
  const amount_type = getUnitCategory(unit_type);
  if (!amount_type) {
    console.log(`No category found for unit type: ${unit_type}`);
    return;
  }
  const requestData = {
    year: parseInt(year),
    region: region,
    amount: {
      [amount_type]: parseInt(amount),
      [amount_type + '_unit']: unit_type,
    },
    fuel_type: fuel_type,
  };
  try {
    const response = await AxiosProvider(token).post(
      'https://preview.api.climatiq.io/energy/v1-preview1/fuel',
      requestData,
      {
        headers: {
          Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response?.data?.message || 'Failed to fetch Fuel data';
    throw new Error(errorMessage);
  }
};

export const fetchCargoData = async (
  token: any,
  amount: any,
  start_location: any,
  transport_mode: any,
  final_destination: any
) => {
  const requestData = {
    route: [
      { location: { query: start_location } },
      { transport_mode: transport_mode },
      { location: { query: final_destination } },
    ],
    cargo: {
      weight: parseInt(amount),
      weight_unit: 't',
    },
  };
  try {
    const response = await AxiosProvider(token).post('https://api.climatiq.io/freight/v1/intermodal', requestData, {
      headers: {
        Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response?.data?.message || 'Failed to fetch Cargo data';
    throw new Error(errorMessage);
  }
};

export const fetchTravelByDistanceData = async (
  token: any,
  start_location: any,
  travel_mode: any,
  final_destination: any,
  distance_km?: any
) => {
  const requestData = {
    origin: { query: start_location },
    travel_mode: travel_mode,
    destination: { query: final_destination },
    distance_km: parseInt(distance_km) || null,
  };
  try {
    const response = await AxiosProvider(token).post(
      'https://preview.api.climatiq.io/travel/v1-preview1/distance',
      requestData,
      {
        headers: {
          Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response?.data?.message || 'Failed to fetch Travel by distance data';
    throw new Error(errorMessage);
  }
};

export const fetchTravelBySpendData = async (token: any, scope: any) => {
  const requestData = {
    money: parseInt(scope?.amount),
    money_unit: scope?.travel?.expenditure?.currency_type,
    spend_type: scope?.travel?.expenditure?.spend_type,
    spend_location: {
      query: scope?.travel?.expenditure?.final_destination,
    },
    spend_year: parseInt(scope?.year) || null,
  };
  try {
    const response = await AxiosProvider(token).post(
      'https://preview.api.climatiq.io/travel/v1-preview1/spend',
      requestData,
      {
        headers: {
          Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response?.data?.message || 'Failed to fetch Travel by spend data';
    throw new Error(errorMessage);
  }
};

export const fetchFugitiveData = async (
  token: any,
  pageNumber: number = 1,
  emittent?: any,
  source?: any,
  region?: any,
  year?: any
) => {
  const getUrl = () => {
    let url = `https://api.climatiq.io/data/v1/search?category=Refrigerants%20and%20Fugitive%20Gases&data_version=^14&results_per_page=10&page=${encodeURIComponent(
      pageNumber
    )}`;
    if (emittent) {
      url += '&query=' + encodeURIComponent(emittent);
    }
    if (year) {
      url += '&year=' + encodeURIComponent(year);
    }
    if (region) {
      url += '&region=' + encodeURIComponent(region);
    }
    if (source) {
      url += '&source=' + encodeURIComponent(source);
    }
    return url;
  };

  try {
    const response = await AxiosProvider(token).get(getUrl(), {
      headers: {
        Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response?.data?.message || 'Failed to fetch Fugitive data';
    throw new Error(errorMessage);
  }
};

export const fetchAdvanceSearchData = async (token: any, pageNumber: number = 1, params?: string, search?: Search) => {
  const getUrl = () => {
    let url = `https://api.climatiq.io/data/v1/search?&data_version=^6${
      params ? `&${params}` : ''
    }&results_per_page=10&page=${encodeURIComponent(pageNumber)}`;

    if (search?.emittent) {
      url += '&query=' + encodeURIComponent(search?.emittent);
    }
    if (search?.unit_type) {
      url += '&unit_type=' + encodeURIComponent(search?.unit_type);
    }
    if (search?.year) {
      url += '&year=' + encodeURIComponent(search?.year);
    }
    if (search?.region) {
      url += '&region=' + encodeURIComponent(search?.region);
    }
    if (search?.source) {
      url += '&source=' + encodeURIComponent(search?.source);
    }
    return url;
  };

  try {
    const response = await AxiosProvider(token).get(getUrl(), {
      headers: {
        Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response?.data?.message || 'Failed to fetch Fugitive data';
    throw new Error(errorMessage);
  }
};

export const fetchAutopilotEstimate = async (token: any, estimate: any) => {
  const amount_type = getUnitCategory(estimate.unit_type);
  if (!amount_type || !estimate.unit_type) {
    const errorMessage = `No category found for unit type: ${estimate.unit_type}`;
    throw new Error(errorMessage);
  }
  const requestData = {
    text: estimate.emittent,
    domain: estimate.domain,
    parameters: {
      [amount_type]: parseInt(estimate.amount),
      ...(amount_type !== 'number' && { [amount_type + '_unit']: estimate.unit_type }),
    },
    year: parseInt(estimate.year),
    region: estimate.region,
  };

  try {
    const response = await AxiosProvider(token).post(
      'https://preview.api.climatiq.io/autopilot/v1-preview1/estimate',
      requestData,
      {
        headers: {
          Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response?.data?.message || 'Failed to fetch Autopilot estimate';
    throw new Error(errorMessage);
  }
};

export const fetchTravelHotelperNight = async (token: any, search: any) => {
  const requestData = {
    hotel_nights: parseInt(search?.hotel?.hotel_nights),
    location: {
      query: search?.hotel?.hotel_location,
    },
    year: parseInt(search?.year),
  };
  try {
    const response = await AxiosProvider(token).post(
      'https://preview.api.climatiq.io/travel/v1-preview1/hotel',
      requestData,
      {
        headers: {
          Authorization: `Bearer ${CLIMATIQ_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    const errorMessage = error.response?.data?.message || 'Failed to fetch Travel hotel per night';
    throw new Error(errorMessage);
  }
};
