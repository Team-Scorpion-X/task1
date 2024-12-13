import createError from 'http-errors';
import db from '../db/Db.js';
import {authSchemaRegister , authSchemaLogin} from '../helpers/ValidationSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { generateToken } from '../jwt/jwt.js';


export const register = async (req, res, next) => {
  try {
    // Validate input data
    const validData = await authSchemaRegister.validateAsync(req.body);

    // Check if user_name or email already exists
    let q = "SELECT user_name, email FROM users WHERE user_name = ? OR email = ?";
    db.query(q, [validData.user_name, validData.email], async (err, result) => {
      if (err) {
        console.log(err);
        return next(createError.InternalServerError()); // Handle database errors
      }

      // If a conflict is found, return an appropriate error
      if (result.length > 0) {
        if (result.some((user) => user.user_name === validData.user_name)) {
          return next(createError.Conflict("Username already exists"));
        }
        if (result.some((user) => user.email === validData.email)) {
          return next(createError.Conflict("Email already exists"));
        }
      } else {
        // Hash the password
        const hashedPassword = await bcrypt.hash(validData.password, 10); // Salt rounds = 10

        // Insert the new user into the database
        let q = "INSERT INTO users (first_name, last_name, user_name, university, email, password) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(
          q,
          [
            validData.first_name,
            validData.last_name,
            validData.user_name,
            validData.university,
            validData.email,
            hashedPassword,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              return next(createError.InternalServerError()); // Handle insertion errors
            }

            // Generate a token for the user (optional)
            const token = generateToken({ id: result.insertId, email: validData.email });
            res.status(201).send({ message: "User registered successfully", token });
          }
        );
      }
    });
  } catch (error) {
    console.log(error);

    // Handle validation and other synchronous errors
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};



export const login = async (req, res, next) => {
  try {
    // Validate input data
    const validData = await authSchemaLogin.validateAsync(req.body);

    // Extract loginIdentifier and password from validated data
    const { loginIdentifier, password } = validData;

    // Query to check for user by email or username
    let q = "SELECT * FROM users WHERE (user_name = ? OR email = ?)";
    db.query(q, [loginIdentifier, loginIdentifier], async (err, results) => {
      if (err) {
        console.log(err);
        return next(createError.InternalServerError("Database error."));
      }

      // If no user is found, return an error
      if (results.length === 0) {
        return next(createError.Unauthorized("Invalid username, email, or password."));
      }

      const user = results[0];

      // Compare the hashed password with the input password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return next(createError.Unauthorized("Invalid username, email, or password."));
      }

      // Generate a token for the user
      const token = jwt.sign(
        { id: user.user_id, user_name: user.user_name, email: user.email },
        process.env.JWT_SECRET, // Ensure you set this environment variable
        { expiresIn: "1h" } // Token expires in 1 hour
      );

      // Respond with the token and user details
      res.status(200).json({
        message: "Login successful",
        token: token,
        user: {
          id: user.user_id,
          first_name: user.first_name,
          last_name: user.last_name,
          user_name: user.user_name,
          email: user.email,
          university: user.university,
        },
      });
    });
  } catch (error) {
    console.log(error);

    // Handle validation errors and other synchronous errors
    if (error.isJoi === true) error.status = 422;
    next(error);
  }
};



export const refreshToken =  async (req, res, next) => {
    res.send("refresh-token route");
    // not coded yet


}


export const logout = async (req, res, next) => {
  try {
    // For a stateless JWT approach, the logout would involve clearing the token on the client side.
    res.status(200).send({ message: "Logout successful" });

  } catch (error) {
    next(createError.InternalServerError());
  }
};