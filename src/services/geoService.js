import axios from 'axios';

// GeoDB Cities API configuration
const GEO_API_BASE_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
const GEO_API_KEY = process.env.REACT_APP_GEODD_API_KEY;

// Create axios instance for GeoDB API
const geoApi = axios.create({
  baseURL: GEO_API_BASE_URL,
  headers: {
    'X-RapidAPI-Key': GEO_API_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
});

// Search cities by name
export const searchCities = async (searchTerm, limit = 10) => {
  try {
    if (!searchTerm || searchTerm.length < 2) {
      return [];
    }

    const response = await geoApi.get('/cities', {
      params: {
        namePrefix: searchTerm,
        limit: limit,
        sort: '-population',
        types: 'CITY'
      }
    });

    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
};

// Get popular cities (for initial dropdown)
export const getPopularCities = async (limit = 20) => {
  try {
    const response = await geoApi.get('/cities', {
      params: {
        limit: limit,
        sort: '-population',
        types: 'CITY'
      }
    });

    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching popular cities:', error);
    return [];
  }
};

// Get cities by country
export const getCitiesByCountry = async (countryCode, limit = 20) => {
  try {
    const response = await geoApi.get('/cities', {
      params: {
        countryIds: countryCode,
        limit: limit,
        sort: '-population',
        types: 'CITY'
      }
    });

    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching cities by country:', error);
    return [];
  }
};

// Format city data for dropdown
export const formatCityData = (cities) => {
  return cities.map(city => ({
    value: `${city.city}, ${city.country}`,
    label: `${city.city}, ${city.country}`,
    city: city.city,
    country: city.country,
    region: city.region,
    population: city.population
  }));
}; 