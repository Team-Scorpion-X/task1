import jwt from "jsonwebtoken";
import createError from "http-errors";
import db from '../db/Db.js';


export const getUserDetails = async (req, res, next) => {
  try {
    // Extract the user ID from the decoded token (set by authentication middleware)

    const token = req.headers['authorization'];
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedData.id;


    // Query the database to get the user's details
    let q = "SELECT user_id, first_name, last_name, user_name, university, reg_no, email FROM users WHERE user_id = ?";
    db.query(q, [userId], (err, results) => {
      if (err) {
        console.log(err);
        return next(createError.InternalServerError("Database error."));
      }

      // If no user is found, return an error
      if (results.length === 0) {
        return next(createError.NotFound("User not found."));
      }

      // Send user details (excluding the password for security)
      const user = results[0];
      res.status(200).json({
        message: "User details retrieved successfully",
        user: {
          id: user.user_id,
          first_name: user.first_name,
          last_name: user.last_name,
          user_name: user.user_name,
          university: user.university,
          reg_no: user.reg_no,
          email: user.email,
        },
      });
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};


export const getMyPosts = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedData.id;

    // Query to fetch posts by the logged-in user
    const q = `SELECT post_id, user_id, status, title, content, image FROM posts WHERE user_id = ? ORDER BY post_id DESC`;
    db.query(q, [userId], (err, results) => {
      if (err) {
        console.log(err);
        return next(createError.InternalServerError("Database error."));
      }

      // If no posts are found, return an appropriate message
      if (results.length === 0) {
        return res.status(200).json({
          message: "No posts found.",
          posts: [],
        });
      }

      // Send the list of posts
      res.status(200).json({
        message: "Posts retrieved successfully.",
        posts: results.map((post) => ({
          id: post.post_id,
          title: post.title,
          content: post.content,
          image: post.image,
          status: post.status,
        })),
      });
    });
  } catch (error) {
    console.log(error);
    next(createError.InternalServerError("Error fetching posts."));
  }
};
