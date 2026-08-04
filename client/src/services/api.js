import { API_BASE_URL } from '../utils/constants';

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
