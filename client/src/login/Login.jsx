// client/src/login/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.css";
import { useAuth } from "../authContext"; // Import the useAuth hook
import Navbar from "../navbar/Navbar";
import Form from "../components/Form";

const Login = () => {
  const { login } = useAuth(); // Get the login function from AuthContext
  const [success, setSuccess] = useState(""); // State variable for success message.
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior.

    try {
      const username = e.target.username.value;
      const password = e.target.password.value;

      // Use the login function from AuthContext to log in
      await login(username, password);

      setSuccess("Login successful"); // Set success message.
      setTimeout(() => { navigate("/"); }, 1000); // Redirect after 1 second
      setError(""); // Clear any previous errors.
    } catch (error) {
      console.error(`An unexpected error occurred: ${error.message}`);
      setError(error.response?.data?.message || error.message); // Set error message state with the error message
    }
  };

  return (
    <div className="login-container">
      <Navbar />      
      <Form 
        isLogin={true} 
        errorMessage={error} 
        successMessage={success} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default Login;