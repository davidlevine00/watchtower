import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const query = `
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
        console.log('Fetching orders...');
        const response = await axios.post(
          process.env.NODE_ENV === 'production'
            ? `https://${process.env.REACT_APP_SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2024-07/graphql.json`
            : '/api/admin/api/2024-07/graphql.json', // Use proxy locally
          { query },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Shopify-Access-Token': process.env.REACT_APP_SHOPIFY_API_KEY,
            },
          }
        );
        console.log('Fetched Orders:', response.data);
        setOrders(response.data.data.orders.edges.map(edge => edge.node));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            <strong>Order ID:</strong> {order.id}<br />
            <strong>Order Name:</strong> {order.name}<br />
            <strong>Total Price:</strong> {order.totalPriceSet.presentmentMoney.amount} {order.totalPriceSet.presentmentMoney.currencyCode}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
