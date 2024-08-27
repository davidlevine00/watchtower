import React, { useEffect, useState } from 'react';
import { fetchOrders } from './shopify';

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    getData();
  }, []);

  return (
    <div className="App">
      <h1>Shopify Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>Order Name:</strong> {order.name} <br />
            <strong>Total Price:</strong> {order.total_price} {order.currency}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;