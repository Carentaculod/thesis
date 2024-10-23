/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom'; // For navigation

const Home = () => {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Welcome to the Home Page!</h1>
        <p style={styles.description}>You have successfully logged in.</p>

        <div style={styles.navContainer}>
          <Link to="/" style={styles.link}>Go back to Login</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    margin: 0,
    padding: 0,
  },
  container: {
    textAlign: 'center',
    padding: '40px',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#333',
  },
  description: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '20px',
  },
  navContainer: {
    marginTop: '20px',
  },
  link: {
    fontSize: '16px',
    color: '#4CAF50',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Home;
