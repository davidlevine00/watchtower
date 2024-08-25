import axios from 'axios';

// Hardcoded API URL pointing to your Lambda function
const API_URL = 'https://pqfmihie7ty5jnwkuoa6vozsom0vqffo.lambda-url.us-east-2.on.aws';

export const fetchOrders = async () => {
  try {
    const response = await axios.get(API_URL); // Directly use the API_URL without any additional path
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw error;
  }
};
