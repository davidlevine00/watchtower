import React, { useState } from 'react';

const QueryForm = ({ onQuerySubmit }) => {
  const [queryType, setQueryType] = useState('customers');
  const [fields, setFields] = useState('id name email');

  const handleQueryTypeChange = (e) => {
    setQueryType(e.target.value);
  };

  const handleFieldsChange = (e) => {
    setFields(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate the query based on user input
    const query = `
      {
        ${queryType}(first: 10) {
          edges {
            node {
              ${fields.split(' ').join(' ')}
            }
          }
        }
      }
    `;
    onQuerySubmit(query);
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
