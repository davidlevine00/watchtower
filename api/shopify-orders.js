const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const query = req.body.query;

  try {
    const response = await fetch(`https://${process.env.REACT_APP_SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2024-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.REACT_APP_SHOPIFY_API_KEY,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const query = req.body.query;

  try {
    console.log("Received query: ", query);  // Log the incoming query

    const response = await fetch(`https://${process.env.REACT_APP_SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2024-07/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.REACT_APP_SHOPIFY_API_KEY,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      // Log detailed error information if the response is not okay
      console.error("Error response from Shopify API:", response.status, response.statusText);
      return res.status(response.status).json({ error: `Shopify API Error: ${response.statusText}` });
    }

    const data = await response.json();
    console.log("Shopify API response:", data);  // Log the response from Shopify API

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
