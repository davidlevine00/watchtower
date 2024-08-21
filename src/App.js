import React from 'react';
import './App.css';
import AcquisitionCostChart from './components/AcquisitionCostChart';
import RevenueProfitChart from './components/RevenueProfitChart';

function App() {
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
      </main>
    </div>
  );
}

export default App;
