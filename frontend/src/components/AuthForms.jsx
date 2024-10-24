/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import liteBackground from '../assets/bg.png'; // Updated the image path

const AuthForms = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    setSuccessMessage(''); // Clear previous success messages
    console.log('Login Email:', email);
    console.log('Login Password:', password);
    
    try {
      const response = await fetch('http://localhost/poverty/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email,
          password,
        }),
      });

      const data = await response.text(); // Get the response from PHP
      
      if (response.ok) {
        // Handle successful login
        console.log('Login successful', data);
        setSuccessMessage(data); // Display success message
        navigate('/home'); // Redirect to Home after login
      } else {
        // Handle server error response
        setErrorMessage(data); // Display server error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage("An error occurred during login. Please try again.");
    }

    // Clear input fields after login
    setEmail('');
    setPassword('');
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
    setSuccessMessage(''); // Clear previous success messages

    // Check if passwords match
    if (registerPassword !== registerConfirmPassword) {
      setErrorMessage("Passwords do not match."); // Set error message
      return;
    }
  
    try {
      const response = await fetch('http://localhost/poverty/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          email: registerEmail,
          password: registerPassword,
        }),
      });
  
      const data = await response.text(); // Get the response from PHP
      
      if (response.ok) {
        // Clear input fields and error message after successful registration
        setRegisterEmail('');
        setRegisterPassword('');
        setRegisterConfirmPassword('');
        setErrorMessage('');
        setSuccessMessage(data); // Display success message

        // Redirect to the login form after successful registration
        navigate('/'); 
      } else {
        // Handle server error response
        setErrorMessage(data); // Display server error message
      }
      
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div style={{ ...styles.page, backgroundImage: `url(${liteBackground})` }}>
      <div style={styles.formsContainer}>
        {/* Login Form */}
        <div style={styles.container}>
          <h2 style={styles.heading}>Login</h2>
          <form onSubmit={handleLoginSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>Login</button>
            {/* Display error message if it exists */}
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>} {/* Display success message */}
          </form>
          <p style={styles.linkText}>
            Do not have an account? <Link to="#" onClick={() => navigate('/register')} style={styles.link}>Register here</Link>
          </p>
        </div>

        {/* Registration Form */}
        <div style={styles.container}>
          <h2 style={styles.heading}>Register</h2>
          <form onSubmit={handleRegisterSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password:</label>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password:</label>
              <input
                type="password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>Register</button>
            {/* Display error message if it exists */}
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            {successMessage && <p style={styles.success}>{successMessage}</p>} {/* Display success message */}
          </form>
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
    width: '100vw',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: 0,
    padding: 0,
  },
  formsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '700px',
  },
  container: {
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent black
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  formGroup: {
    marginBottom: '15px',
    width: '93%',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#fff',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    width: '100%',
  },
  linkText: {
    marginTop: '10px',
    color: '#fff',
    textAlign: 'center',
  },
  link: {
    color: '#4CAF50',
    textDecoration: 'none',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default AuthForms;
