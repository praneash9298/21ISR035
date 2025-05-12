import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
import Navbar from '../compoents/Navbar';
import { getStocksList, getStockPrices } from '../api/api';
// import StockChart from '../components/StockChart';
import StockChart from '../compoents/StockChart';
import { Container, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const StockPage = () => {
  const [stocks, setStocks] = useState({});
  const [selectedStock, setSelectedStock] = useState('');
  const [data, setData] = useState([]);
  const [minutes, setMinutes] = useState(50);

  useEffect(() => {
    getStocksList().then(res => setStocks(res.data.stocks));
  }, []);

  useEffect(() => {
    if (selectedStock) {
      getStockPrices(selectedStock, minutes).then(res => setData(res.data));
    }
  }, [selectedStock, minutes]);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Stock</InputLabel>
          <Select value={selectedStock} label="Select Stock" onChange={e => setSelectedStock(e.target.value)}>
            {Object.entries(stocks).map(([name, ticker]) => (
              <MenuItem key={ticker} value={ticker}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Minutes</InputLabel>
          <Select value={minutes} label="Minutes" onChange={e => setMinutes(e.target.value)}>
            {[10, 30, 50, 100].map(m => <MenuItem key={m} value={m}>{m} mins</MenuItem>)}
          </Select>
        </FormControl>

        {data.length > 0 && <StockChart data={data} />}
      </Container>
    </>
  );
};

export default StockPage;