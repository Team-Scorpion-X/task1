import express from 'express';
const profileRouter = express.Router();
import { getUserDetails } from '../profile/profile.js';

profileRouter.get("/",getUserDetails)

export default profileRouter;