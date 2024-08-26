import axios from 'axios';

const API_URL = 'https://pqfmihie7ty5jnwkuoa6vozsom0vqffo.lambda-url.us-east-2.on.aws';
const SHOP_URL = process.env.REACT_APP_SHOP_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}?shopUrl=${SHOP_URL}&accessToken=${ACCESS_TOKEN}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw error;
  }
};
