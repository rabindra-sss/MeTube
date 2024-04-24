import express from "express";
import { signup, signin, googleSignin } from "../controllers/authController.js";

const authRouter = express();
// sign up
authRouter.post('/signup',signup);
// sign in
authRouter.post('/signin',signin);
//google auth
authRouter.post('/google',googleSignin);

export default authRouter;