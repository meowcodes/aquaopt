import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TimeSeriesChart } from './TimeSeriesChart';

function App() {
  return (
    <div className='App'>
      <TimeSeriesChart title='Water Temperature (C)' min={19} max={21} color="blue" />
    </div>
  );
}

export default App;
