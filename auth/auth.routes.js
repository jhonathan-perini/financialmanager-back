import {Router} from "express";
import {isAuth, loginUser, logout, registerUser} from "./auth.controller.js";


const authRouter = Router()

authRouter.route('/login').post(loginUser)
authRouter.route('/register').post(registerUser)
authRouter.route('/isAuth').get(isAuth)
authRouter.route('/logout').get(logout)

export default authRouter