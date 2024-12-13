import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import db from '../db/db.js';


// Function to generate a token
export const generateToken = (user) => {
  const payload = {
    user_id: user.user_id,
    phone_number: user.phone_number,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Middleware to verify token
export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Access Denied: No Token Provided!');
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
        if(error.name === 'JsonWebTokenError'){
            return next(createHttpError.Unauthorized());
        }
        else{
            return next(createHttpError.Unauthorized(error.message));
        }
  }
};

//check admin
export const verifyAdmin = async (req, res, next) => {
  const token = req.headers['authorization'];

  if(!token) return res.status(401).send('Access Denied: No Token Provided!');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    const phone_number = verified.phone_number;
    const user_id = verified.user_id;
    
    const q = "SELECT type FROM user_details WHERE phone_number = ? AND user_id = ?"
    db.query(q,[phone_number,user_id], (err,data)=>{
      if(err) return next(createHttpError.InternalServerError());
      if (data.length === 0) return next(createHttpError.Unauthorized('User not found'));
      if((data[0].type) !== "admin") return next(createHttpError.Unauthorized());
      req.user = verified;
      next();
    })

  } catch (error) {
        console.log(error)
        if(error.name === 'JsonWebTokenError'){
            return next(createHttpError.Unauthorized());
        }
        else{
            return next(createHttpError.Unauthorized(error.message));
        }
  }


}


// function to generate unique order id
export const generateUniqueOrderId = () => {
  const timestamp = Date.now(); // Get current timestamp
  const randomNum = Math.floor(Math.random() * 100000); // Generate random number
  return `${timestamp}-${randomNum}`; // Combine both to create a unique order ID
};