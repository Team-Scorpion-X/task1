import express from 'express';
const AuthRouter = express.Router();
import { register, login, logout ,refreshToken} from '../authControl/AuthControl.js';


AuthRouter.post("/register", register);
AuthRouter.post("/login", login );
AuthRouter.post("/refresh-token",refreshToken);
AuthRouter.delete("/logout",logout);


export default AuthRouter;