// client/src/authContext.js
import React, { createContext, useState, useContext } from "react";
import apiClient from "./apiClient.js";

// Create the AuthContext.
const AuthContext = createContext();

// Create the AuthProvider component.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(""); // State to store error messages

  // Log in a user.
  const login = async (username, password) => {
    try {
      const response = await apiClient.post('/api/login', { username, password });
      if (response.status === 200) {
        setUser(response.data);
        setErr(""); // Clear any previous errors
        return response.status; // Return the status code
      } else {
        throw new Error(response.data.message || "Login failed.");
      }
    } catch (err) {
      console.error(`Login error: ${err.message}`);
      setErr(err.response?.data?.message || err.message || "An unexpected error occurred.");
      return err.response?.status || 500; // Return the error status code
    }
  };

  // Register a user.
  const register = async (username, email, password) => {
    try {
      const response = await apiClient.post('/api/register', { username, email, password });
      if (response.status === 201) {
        setUser(response.data);
        setErr(""); // Clear any previous errors
        return response.status; // Return the status code
      } else {
        throw new Error(response.data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(`Registration error: ${err.message}`);
      setErr(err.response?.data?.message || err.message || "An unexpected error occurred.");
      return err.response?.status || 500; // Return the error status code
    }
  };

  // Log out a user
  const logout = async () => {
    try {
      await apiClient.get('/api/logout');  // Ensure this endpoint handles logout correctly
      setUser(null);
      setErr(""); // Clear any previous errors
    } catch (err) {
      console.error(`Logout error: ${err.message}`);
      setErr("An unexpected error occurred during logout.");
    }
  };

  // Check if the user is authenticated.
  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, err, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);