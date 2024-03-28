import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import HashLoader from 'react-spinners/HashLoader';
import axios from 'axios';
import './Athu.css';
import { CgMail } from "react-icons/cg";
import { CiLock } from "react-icons/ci";
import Cookies from 'js-cookie';


const Athuntication = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [forgotPasswordError, setForgotPasswordError] = useState('');


  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setSignupError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://dealy-dress-colur-suggestion-backend.onrender.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setMessage(data.message);
      setLoading(false);
      navigate('#login');
    } catch (error) {
      setSignupError(error.message);
      setLoading(false);
    }
  };

  axios.defaults.withCredentials = true
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!email || !password) {
      setLoginError('Email and password are required');
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post('https://dealy-dress-colur-suggestion-backend.onrender.com/login', {
        email,
        password,
      });
  
      const data = response.data;
  // Store the token in localStorage
  localStorage.setItem('token', data.token);
      Cookies.set('token', data.token, { expires: 70 }); // Set the cookie to expire in 70 days

      
      if (data.Status === "Success") {
        if (data.role === "admin") {
          navigate('/Dashboard');
        } else {
          navigate('/Suggetion');
        }
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setLoginError(error.response.data.error);
      } else {
        setLoginError('Error: Failed to log in');
      }
    } finally {
      setLoading(false);
    }
  };
  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  const handleSubmitForgotPassword = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.post('https://dealy-dress-colur-suggestion-backend.onrender.com/forgot-password', { email })
      .then(res => {
        if (!email) {
          setForgotPasswordError('gmail are required');
          return;
        }
        if (res.data.Status === "Success") {
          setForgotPasswordError('Forgot password email sent successfully');
          // Clear the email field after successful submission
          setEmail('');
        } else {
          setForgotPasswordError('Failed to send  reset password link');
        }
      })
      .catch(err => {
        setForgotPasswordError('Failed to reset password');
      });
  };
  

  return (
    <div >

      <div className='text'><h1 className='text-center'>
      signup&login for Dealy dress color suggetion</h1></div>
      {loading && (
        <div className="loading-overlay">
          <HashLoader color="#1EA7FD" />
        </div>
      )}
      
      
      <div>
      </div>

     {/* signup */}
     
     <section className='signup' id='signup'>
      <div className='login-container'>
    <div>
      <div className='container mt-5'>
        <h2>Sign Up</h2>
        <Form onSubmit={handleSubmitSignup}>
          {/* Your form fields and submit button */}
    {signupError  && <Alert variant="danger">{signupError}</Alert>} {/* Display the error message */}
          {message && <Alert variant="success">{message}</Alert>} {/* Display the success message */}
          <Form.Group controlId="formBasicEmail">
            
            <Form.Label> Gmail<CgMail />:</Form.Label>
            <Form.Control type="email"placeholder='Enter gmail here ' autoComplete='off' value={email} onChange={(event) => setEmail(event.target.value)} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password<CiLock />:</Form.Label>
            <Form.Control type="password" placeholder='Enter password' value={password} onChange={(event) => setPassword(event.target.value)} />
          </Form.Group>
          <Button className="mt-2" variant="btn btn-outline-primary" type="submit">
            Sign up
          </Button>
          <br />
          {message && <p>{message}</p>}
        </Form>
        <p className="mt-3">
          Already have an account?   <strong> <Button>  <a className="nav-link" href="#login" onClick={handleLoginClick}>login</a>
          </Button></strong>
        </p>
      </div>
    </div>
  </div>
  </section>
  
    
    {/* login */}

    {showLogin && (
    <section className='login' id='login'>
    <div className='login-container'>
        <div >
      <div className='mb-3'>
        <h2>Login</h2>
        <Form onSubmit={handleSubmitLogin}>
          {loginError  && <Alert variant="danger">{loginError }</Alert>}
          {error && <Alert variant="danger">{error}</Alert>} 
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Gmail<CgMail />:</Form.Label>
            <Form.Control type="email" placeholder='Enter gmail here ' value={email} onChange={(e) => setEmail(e.target.value)} />
           
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password<CiLock />:</Form.Label>
            <Form.Control placeholder='Enter a valide password ' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button className="mt-2" variant="btn btn-outline-primary" type="submit">
            Login
          </Button>
        </Form>
        <p className="mt-3">
          Don't have an account? <strong> <a className="nav-link" href="#signup">signup</a></strong>
        </p>
        <strong> <a className="nav-link" href="#ForgetPassword" onClick={handleForgotPasswordClick}>ForgetPassword</a></strong>
      
      </div></div></div>
      </section>
)}
      {/* forgotpassword */}

      {showForgotPassword && (
        <section id='ForgetPassword'>
          <div className="login-container">
            <div >
              <h4>Forgot Password</h4>
              <form onSubmit={handleSubmitForgotPassword}>
              {forgotPasswordError && <Alert variant="success">{forgotPasswordError}</Alert>}
                <div className="mb-3">
                  <label htmlFor="email">
                    <strong>Gmail<CgMail /></strong>
                  </label>
                 
                  <input
                    type="email"
                    placeholder="Enter Gmail"
                    autoComplete="off"
                    name="email"
                    className="form-control rounded-0"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p>Note: Enter Gmail Id, Gmail Required</p>
                </div>
                <Button type="submit" variant="btn btn-outline-primary" disabled={loading}>
          {loading ? <HashLoader color="#FFFFFF" size={15} /> : 'Send'}
        </Button>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Athuntication;
