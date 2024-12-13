import React, { useEffect, useState } from "react";
import axios from "axios";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // Get token from local storage
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view your posts.");
          setLoading(false);
          return;
        }

        // Fetch posts using the API
        const response = await axios.get("http://localhost:4443/profile/myposts", {
          headers: {
            Authorization: `${token}`,
          },
        });

        setPosts(response.data.posts);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch posts.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading your posts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="text-white" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {posts.length === 0 ? (
        <p>You have not created any posts yet.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {posts.map((post) => (
            <li
              key={post.id}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <h2 style={{ marginBottom: "10px" }}>{post.title}</h2>
              <p>{post.content}</p>
              {post.image && (
                <img
                  src={`http://localhost:4443${post.image}`}
                  alt={post.title}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    marginTop: "10px",
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPosts;
