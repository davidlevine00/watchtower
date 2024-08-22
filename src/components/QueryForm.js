import React, { useState } from 'react';

const QueryForm = ({ onQuerySubmit }) => {
  const [queryType, setQueryType] = useState('orders');
  const [fields, setFields] = useState(queryType === 'customers' ? 'id firstName lastName email' : 'id name totalPriceSet { presentmentMoney { amount currencyCode } }');

  const handleQueryTypeChange = (e) => {
    const newQueryType = e.target.value;
    setQueryType(newQueryType);
    setFields(newQueryType === 'customers' ? 'id firstName lastName email' : 'id name totalPriceSet { presentmentMoney { amount currencyCode } }');
  };

  const handleFieldsChange = (e) => {
    setFields(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = `
      {
        ${queryType}(first: 5) {
          edges {
            node {
              ${fields}
            }
          }
        }
      }
    `;
    onQuerySubmit(queryType, query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Query Type:
        <select value={queryType} onChange={handleQueryTypeChange}>
          <option value="orders">Orders</option>
          <option value="customers">Customers</option>
        </select>
      </label>
      <br />
      <label>
        Fields (space-separated):
        <input type="text" value={fields} onChange={handleFieldsChange} />
      </label>
      <br />
      <button type="submit">Run Query</button>
    </form>
  );
};

export default QueryForm;
