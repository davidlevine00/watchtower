import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = ({ queryType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const graphqlQuery = queryType === 'customers'
        ? `
          {
            customers(first: 5) {
              edges {
                node {
                  id
                  firstName
                  lastName
                  email
                }
              }
            }
          }
        `
        : `
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
        `;

      // Determine the base URL based on the environment
      const baseURL = process.env.NODE_ENV === 'production'
        ? ''  // For production (Vercel), use the proxy path or full API path as needed
        : '/api';  // For local development, use the proxy

      try {
        console.log('Fetching data...');
        const response = await axios.post(
          `${baseURL}`,  // Base URL combined with the path
          { query: graphqlQuery },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Access-Token': process.env.REACT_APP_SHOPIFY_API_KEY,
            },
          }
        );
        console.log('Full Response:', response.data);

        if (response.data.data) {
          const data = queryType === 'customers' ? response.data.data.customers.edges : response.data.data.orders.edges;
          setItems(data.map(edge => edge.node));
        } else {
          console.warn('No data found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [queryType]);

  return (
    <div>
      <h2>{queryType === 'customers' ? 'Customer List' : 'Order List'}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <strong>{queryType === 'customers' ? 'Customer ID' : 'Order ID'}:</strong> {item.id}<br />
            {queryType === 'customers' ? (
              <>
                <strong>Name:</strong> {item.firstName} {item.lastName}<br />
                <strong>Email:</strong> {item.email}
              </>
            ) : (
              <>
                <strong>Order Name:</strong> {item.name}<br />
                {/* Add checks before accessing presentmentMoney */}
                <strong>Total Price:</strong> {item.totalPriceSet && item.totalPriceSet.presentmentMoney 
                  ? `${item.totalPriceSet.presentmentMoney.amount} ${item.totalPriceSet.presentmentMoney.currencyCode}` 
                  : 'N/A'}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
