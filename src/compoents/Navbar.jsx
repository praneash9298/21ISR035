import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Stock Aggregator
        </Typography>
        <Button color="inherit" component={Link} to="/">Stock Page</Button>
        <Button color="inherit" component={Link} to="/heatmap">Heatmap</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;