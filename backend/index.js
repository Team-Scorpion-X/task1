import express, { json } from 'express'
import morgan from 'morgan'
import createError from 'http-errors'
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';import AuthRouter from './routes/authRoutes.js';
import profileRouter from './routes/profileRoutes.js';
import postRouter from './routes/postRoutes.js';
const app = express()
    
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({extended :true}))
app.use(morgan('dev')); // loging all things
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get("/", async (req,res)=>{
    res.send("Ay whotto mekt awe");
})

app.use("/auth" , AuthRouter)
app.use("/profile" , profileRouter)
app.use("/posts" , postRouter)


app.use(async (req,res,next) =>{
    next(createError.NotFound("ehm file ekk na pko"));
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error: {
            status : err.status || 500,
            message : err.message,
        },
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`);
});