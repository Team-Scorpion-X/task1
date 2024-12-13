import React, { useEffect, useState } from "react";
import axios from "axios";
import './profile.css'; // Import the CSS file

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:4443/profile", {
          headers: {
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcl9uYW1lIjoiam9obmRvZTEyMyIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE3MzQwNzQyOTIsImV4cCI6MTczNDA3Nzg5Mn0.VvF1MqZKCk7yVq_JfgDzfPWg3mxHZdIUl9OgG3wtIIU',
          },
        });

        setUser(response.data.user);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user details.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="loading-msg">Loading...</p>;
  if (error) return <p className="error-msg">{error}</p>;

  return (
    <div className="profile-page-container">
      <h1 className="profile-title">User Profile</h1>
      {user && (
        <div className="profile-card">
          <div className="profile-item">
            <span className="profile-label">ID</span>
            <span className="profile-value">{user.id}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">First Name</span>
            <span className="profile-value">{user.first_name}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Last Name</span>
            <span className="profile-value">{user.last_name}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Username</span>
            <span className="profile-value">{user.user_name}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">University</span>
            <span className="profile-value">{user.university}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Registration Number</span>
            <span className="profile-value">{user.reg_no}</span>
          </div>
          <div className="profile-item">
            <span className="profile-label">Email</span>
            <span className="profile-value">{user.email}</span>
          </div>
        </div>
      )}

      <h2 className="profile-subtitle">My Posts</h2>
      <div className="my-posts">
        {/* Replace this with dynamic posts once available */}
        <div className="post-item">Post Title 1</div>
        <div className="post-item">Post Title 2</div>
        <div className="post-item">Post Title 3</div>
      </div>
    </div>
  );
};

export default UserProfile;
