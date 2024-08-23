// client/src/authContext.js
import React, { createContext, useState, useContext } from "react";
import apiClient from "./apiClient.js";

// Create the AuthContext.
const AuthContext = createContext();

// Create the AuthProvider component.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(""); // State to store error messages

  // Log in a user.
  const login = async (username, password) => {
    try {
      const response = await apiClient.post('/api/login', { username, password });
      if (response.status === 200) {
        setUser(response.data);
        setError(""); // Clear any previous errors
      } else {
        throw new Error(response.data.message || "Login failed.");
      }
    } catch (err) {
      console.error(`Login error: ${err.message}`);
      setError(err.response?.data?.message || err.message || "An unexpected error occurred.");
    }
  };

  // Register a user.
  const register = async (username, email, password) => {
    try {
      const response = await apiClient.post('/api/register', { username, email, password });
      if (response.status === 201) {
        setUser(response.data);
        setError(""); // Clear any previous errors
      } else {
        throw new Error(response.data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(`Registration error: ${err.message}`);
      setError(err.response?.data?.message || err.message || "An unexpected error occurred.");
    }
  };

  // Log out a user
  const logout = async () => {
    try {
      // Perform any logout-related actions if needed (e.g., clearing tokens)
      setUser(null);
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error(`Logout error: ${err.message}`);
      setError("An unexpected error occurred during logout.");
    }
  };

  // Check if the user is authenticated.
  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider value={{ user, error, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);