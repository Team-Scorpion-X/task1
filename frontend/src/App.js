import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use BrowserRouter for routing
import './App.css';
import { ToastContainer } from "react-toastify";  // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import toastify CSS
import Login from './pages/auth/Login';  // Import your Login page

import Registration from './pages/auth/Register';

import UserProfile from './pages/profile/Profile';
import CreatePost from './pages/posts/NewPost';



function App() {
  return (
    <Router>
      <div className="App">
        {/* ToastContainer added to show toasts on any page */}
        <ToastContainer 
          position="top-right" 
          autoClose={3000}  // Toast disappears after 3 seconds
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover
          theme="colored"  // Optional: Change the theme of the toasts
        />

        {/* Define the Routes inside BrowserRouter */}
        <Routes>
          <Route path="/" element={<Login />} />  

          <Route path="/register" element={<Registration/>} />  

          <Route path="/profile" element={<UserProfile />} />  

          <Route path="/post/new" element={<CreatePost />} />  

          {/* You can add more routes here */}
          {/* Example: <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
