import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';
import Navbar from '../compoents/Navbar';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from '@mui/material';
import { getStocksList, getStockPrices } from '../api/api';

const HeatmapPage = () => {
  const [stocks, setStocks] = useState({});
  const [correlationMatrix, setCorrelationMatrix] = useState([]);

  useEffect(() => {
    // 1. Fetch stock list
    getStocksList().then(res => setStocks(res.data.stocks));
  }, []);

  useEffect(() => {
    if (Object.keys(stocks).length > 0) {
      fetchAndComputeCorrelation();
    }
  }, [stocks]);

  const fetchAndComputeCorrelation = async () => {
    const stockTickers = Object.values(stocks);
    const priceData = {};

    // 2. Fetch price history for each stock (50 minutes)
    for (const ticker of stockTickers) {
      const res = await getStockPrices(ticker, 50);
      priceData[ticker] = res.data.map(item => item.price);
    }

    // 3. Calculate correlation matrix
    const matrix = stockTickers.map(ticker1 => {
      return stockTickers.map(ticker2 => {
        if (ticker1 === ticker2) return 1;
        return computeCorrelation(priceData[ticker1], priceData[ticker2]);
      });
    });

    setCorrelationMatrix(matrix);
  };

  // 📊 Pearson correlation formula
  const computeCorrelation = (arr1, arr2) => {
    const minLen = Math.min(arr1.length, arr2.length);
    const x = arr1.slice(0, minLen);
    const y = arr2.slice(0, minLen);

    const avgX = x.reduce((a, b) => a + b, 0) / x.length;
    const avgY = y.reduce((a, b) => a + b, 0) / y.length;

    const numerator = x.reduce((sum, xi, i) => sum + (xi - avgX) * (y[i] - avgY), 0);
    const denomX = Math.sqrt(x.reduce((sum, xi) => sum + (xi - avgX) ** 2, 0));
    const denomY = Math.sqrt(y.reduce((sum, yi) => sum + (yi - avgY) ** 2, 0));

    return (numerator / (denomX * denomY)).toFixed(2);
  };

  // 📈 Standard deviation
  const computeStdDev = arr => {
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const variance = arr.reduce((a, b) => a + (b - mean) ** 2, 0) / arr.length;
    return Math.sqrt(variance).toFixed(2);
  };

  const stockNames = Object.keys(stocks);
  const stockTickers = Object.values(stocks);

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Correlation Heatmap</Typography>
        
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {stockTickers.map((ticker, idx) => (
                  <TableCell key={idx}>
                    <Tooltip title={
                      <>
                        Avg: {(
                          computeAverage(
                            correlationMatrix[idx] || []
                          )
                        )} 
                        <br />
                        Std Dev: {computeStdDev(correlationMatrix[idx] || [])}
                      </>
                    }>
                      <span>{ticker}</span>
                    </Tooltip>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {correlationMatrix.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>
                    <Tooltip title={
                      <>
                        Avg: {computeAverage(row)} 
                        <br />
                        Std Dev: {computeStdDev(row)}
                      </>
                    }>
                      <span>{stockTickers[rowIndex]}</span>
                    </Tooltip>
                  </TableCell>

                  {row.map((value, colIndex) => (
                    <TableCell 
                      key={colIndex} 
                      align="center" 
                      sx={{ backgroundColor: getColor(value) }}
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

// 🟢 Color legend (from red to green)
const getColor = val => {
  const num = parseFloat(val);
  if (num >= 0.75) return '#4caf50'; // strong positive green
  if (num >= 0.5) return '#81c784';
  if (num >= 0.25) return '#c8e6c9';
  if (num >= 0) return '#e8f5e9';
  if (num >= -0.25) return '#ffebee';
  if (num >= -0.5) return '#ef9a9a';
  if (num >= -0.75) return '#e57373';
  return '#f44336'; // strong negative red
};

// 🔥 Helper average
const computeAverage = arr => {
  if (!arr || arr.length === 0) return 0;
  const sum = arr.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
  return (sum / arr.length).toFixed(2);
};

export default HeatmapPage;