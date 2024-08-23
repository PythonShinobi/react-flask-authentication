// client/src/profile/Profile.js
import React from 'react';

import "./Profile.css";
import { useAuth } from '../authContext';
import Navbar from "../navbar/Navbar";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    // Optionally handle case where user is not authenticated
    return <p>Loading...</p>;
  }

  return (
    <div className='profile-container'>
      <Navbar />
      <h1>Profile</h1>
      <p>Welcome, {user?.username}!</p>
      {/* Display more user details or profile information */}
    </div>
  );
};

export default Profile;