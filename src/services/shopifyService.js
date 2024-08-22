import axios from 'axios';

const SHOPIFY_API_URL = `https://${process.env.REACT_APP_SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2024-07/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = process.env.REACT_APP_SHOPIFY_API_KEY;

export const fetchOrders = async (query = `
  {
    orders(first: 5) {
      edges {
        node {
          id
          name
          totalPriceSet {
            presentmentMoney {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`) => {
  try {
    console.log('Fetching from URL:', SHOPIFY_API_URL);  // Log URL for debugging
    const response = await axios.post(
      SHOPIFY_API_URL,
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        },
      }
    );

    console.log('Response data:', response.data);  // Log the response for debugging
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
