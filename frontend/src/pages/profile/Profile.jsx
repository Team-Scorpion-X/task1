import React, { useEffect, useState } from "react";
import axios from "axios";
import MyPosts from "../../comp/MyPosts";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user's profile
    const fetchProfile = async () => {
      try {
        setLoading(true);

        // Get token from local storage (assuming token is saved here after login)
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }

        // Call the API
        const response = await axios.get("http://localhost:4443/profile", {
          headers: {
            Authorization: `${token}`,
          },
        });

        // Set user details in state
        setUser(response.data.user);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user details.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>User Profile</h1>
      <table border="1" style={{ borderCollapse: "collapse", width: "50%" }}>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{user.id}</td>
          </tr>
          <tr>
            <th>First Name</th>
            <td>{user.first_name}</td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>{user.last_name}</td>
          </tr>
          <tr>
            <th>Username</th>
            <td>{user.user_name}</td>
          </tr>
          <tr>
            <th>University</th>
            <td>{user.university}</td>
          </tr>
          <tr>
            <th>Registration Number</th>
            <td>{user.reg_no}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </table>

      <div className="myposts">
        <MyPosts/>
      </div>
    </div>
  );
};

export default UserProfile;
