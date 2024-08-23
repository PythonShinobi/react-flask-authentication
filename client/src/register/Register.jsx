// client/src/register/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Register.css";
import { useAuth } from "../authContext"; // Import the useAuth hook
import Navbar from "../navbar/Navbar";
import Form from "../components/Form";

const Register = () => {
  const { register } = useAuth(); // Get the register function from AuthContext
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const username = e.target.username.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const rpassword = e.target.rpassword.value;

      if (password !== rpassword) {
        setError("The passwords don't match");
        return;
      }

      // Use the register function from AuthContext to register the user
      await register(username, email, password);

      setSuccess("Registration successful!"); // Set success message
      setTimeout(() => { navigate("/login"); }, 1000); // Redirect after 1 second
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      // Handle specific error messages from backend
      setError(error.response?.data?.message || error.message || "Unknown error occurred.");
    }
  };

  return (
    <div className="register-container">
      <Navbar />
      <Form 
        isLogin={false} 
        errorMessage={error} 
        successMessage={success} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
};

export default Register;