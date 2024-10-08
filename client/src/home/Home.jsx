// client/home/Home.jsx
import React from 'react';
import { Typography, Container } from '@mui/material';

import './Home.css';
import Navbar from '../navbar/Navbar';

const Home = () => {
  return (
    <Container className='home-container'>
      <Navbar />
      <Typography variant="h4" component="h1" align="center" sx={{ mt: 5 }}>
        This is the home page
      </Typography>
    </Container>
  );
};

export default Home;
