import React, { useEffect, useState } from 'react';
import { fetchOrders } from './shopify';

const OrdersComponent = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const ordersData = await fetchOrders();
                console.log("Fetched Orders:", ordersData); // Log the fetched data
                setOrders(ordersData); // Update state with the fetched orders
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        getOrders();
    }, []);

    return (
        <div>
            <h1>Shopify Orders</h1>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order, index) => (
                        <li key={index}>{order.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default OrdersComponent;
