import axios from 'axios';

// Construct the Shopify API URL using environment variables
const SHOPIFY_API_URL = `https://${process.env.REACT_APP_SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2024-07/graphql.json`;
const SHOPIFY_ACCESS_TOKEN = process.env.REACT_APP_SHOPIFY_API_KEY;

// Function to fetch orders from Shopify
export const fetchOrders = async (query = `
  {
    orders(first: 1) {
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

    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
