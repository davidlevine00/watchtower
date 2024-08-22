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

      try {
        // Use '/api' as this is proxied to Shopify API
        const response = await axios.post(
          '/api',  // This should match the proxy setup
          { query: graphqlQuery },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Access-Token': process.env.REACT_APP_SHOPIFY_API_KEY, // Ensure the access token is included
            },
          }
        );

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