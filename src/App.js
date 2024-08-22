import React, { useState } from 'react';
import AcquisitionCostChart from './components/AcquisitionCostChart';
import RevenueProfitChart from './components/RevenueProfitChart';
import OrderList from './components/OrderList';
import QueryForm from './components/QueryForm';

function App() {
  const [queryType, setQueryType] = useState('orders');
  const [marketingSpend, setMarketingSpend] = useState(1000); // Default marketing spend

  const handleQuerySubmit = (newQueryType, query) => {
    setQueryType(newQueryType);
  };

  const handleMarketingSpendChange = (e) => {
    setMarketingSpend(Number(e.target.value));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Customer Acquisition and Profit Analysis</h1>
      </header>
      <main>
        <section>
          <h2>Customer Acquisition Cost by Source</h2>
          <AcquisitionCostChart />
        </section>
        <section>
          <h2>Revenue and Profit Analysis</h2>
          <RevenueProfitChart />
        </section>
        <section>
          <h2>Shopify Data</h2>
          <QueryForm onQuerySubmit={handleQuerySubmit} />
          <div>
            <label>
              Total Marketing Spend: 
              <input type="number" value={marketingSpend} onChange={handleMarketingSpendChange} />
            </label>
          </div>
          <OrderList queryType={queryType} totalSpend={marketingSpend} />
        </section>
      </main>
    </div>
  );
}

export default App;
