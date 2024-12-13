import express from 'express';
const profileRouter = express.Router();
import { getMyPosts, getUserDetails } from '../profile/profile.js';

profileRouter.get("/",getUserDetails)
profileRouter.get("/myposts",getMyPosts)

export default profileRouter;