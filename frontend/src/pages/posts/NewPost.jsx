import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (image) {
        formData.append('image', image);
      }

      // Get token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must be logged in to create a post.');
        return;
      }

      // Send post request to API
      const response = await axios.post('http://localhost:4443/posts/new', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      });

      setMessage(response.data.message);
      setTitle('');
      setContent('');
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || 'Failed to create post.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold text-center mb-4">Create a Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium mb-2">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter your post title"
            className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content" className="text-lg font-medium mb-2">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Write your post content here..."
            className="p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring focus:ring-green-500"
            rows="5"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className="text-lg font-medium mb-2">Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="bg-gray-700 text-gray-300 p-2 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 rounded-md bg-green-600 hover:bg-green-700 text-white font-semibold transition duration-300"
        >
          Submit
        </button>
      </form>
      {message && <p className="text-center text-green-400 mt-4">{message}</p>}
    </div>
  );
};

export default CreatePost;
