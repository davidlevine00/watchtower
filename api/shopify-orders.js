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
