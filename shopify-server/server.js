require('dotenv').config({ path: '.env.local' });
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get('/fetch-orders', async (req, res) => {
  try {
    const response = await axios.get(
      'https://martin-clinic-2.myshopify.com/admin/api/2024-07/orders.json',
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
        },
      }
    );

    res.json(response.data.orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});