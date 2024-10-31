import React from 'react';
import { Navigate } from 'react-router-dom';

const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1]; // Extract the payload part
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

const isTokenValid = (token) => {
  if (!token) return false;
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return false;

  const currentTime = Date.now() / 1000; // Current time in seconds
  return decoded.exp > currentTime; // Token is valid if expiration time is in the future
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  return isTokenValid(token) ? children : <Navigate to="/login" />;
};

export default PrivateRoute;