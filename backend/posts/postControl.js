import multer from "multer";
import path from "path";
import createError from "http-errors";
import db from "../db/Db.js";
import jwt from "jsonwebtoken";


// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Directory to store uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, jpg, png) are allowed."));
    }
  },
});

export const createPost = [
  upload.single("image"), // Middleware to handle file upload
  async (req, res, next) => {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        return next(createError.BadRequest("Title and content are required."));
      }

      const token = req.headers["authorization"];
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedData.id;

      const image = req.file ? `/uploads/${req.file.filename}` : null;

      // Insert post into the database
      const q = `INSERT INTO posts (user_id, status, title, content, image) VALUES (?, ?, ?, ?, ?)`;
      db.query(q, [userId, 1, title, content, image], (err, result) => {
        if (err) {
          console.log(err);
          return next(createError.InternalServerError("Database error."));
        }

        res.status(201).json({
          message: "Post created successfully",
          post: {
            id: result.insertId,
            user_id: userId,
            title,
            content,
            image,
          },
        });
      });
    } catch (error) {
      console.log(error);
      next(createError.InternalServerError("Error creating post."));
    }
  },
];
