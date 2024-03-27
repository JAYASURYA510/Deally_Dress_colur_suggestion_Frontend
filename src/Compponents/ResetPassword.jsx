import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Athu.css';
import HashLoader from "react-spinners/HashLoader";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post(`https://dealy-dress-colur-suggestion-backend.onrender.com/reset-password/${id}/${token}`, { password })
      .then((res) => {
        if (res.data.Status === 'Success') {
          setMessage('Password reset successful. Please login with your new password.');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      {loading && (
        <div className="loading-overlay">
          <HashLoader color="#36d7b7" />
        </div>
      )}
      <div>
        <Card className="login-container">
          <h4>Reset Password</h4>
          {message && (
            <div>
              <p>{message}</p>
              <Button as={Link} to="/athuntication" variant="btn btn-outline-primary">
                Login
              </Button>
            </div>
          )}
          {!message && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="password">
                  <strong>New Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  autoComplete="off"
                  name="password"
                  className="form-control rounded-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" variant="btn btn-outline-primary">
                Update
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}

export default ResetPassword;
