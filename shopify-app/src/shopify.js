import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/fetch-orders`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw error;
  }
};