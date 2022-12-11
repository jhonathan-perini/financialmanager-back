import express from 'express'
import cors from 'cors'
import compression from 'compression'
import expensesRouter from "./expenses/expenses.routes.js";

import  session from 'express-session';
import authRouter from "./auth/auth.routes.js";
const app = express()
const MAX_AGE = 1000 * 60 * 60 * 24



app.use(session({
    secret: 'a1s2d3f4g5h6',
    name: 'mySession', // cookies name to be put in "key" field in postman
    cookie: {
        maxAge: MAX_AGE, // this is when our cookies will expired and the session will not be valid anymore (user will be log out)
        httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    sameSite: false,
    secure: false
}))

export function requireAuth(req, res, next) {
    const {user} = req.session

    if(!user) {
        return res.status(401).json({message: "Unauthorized"})
    }
    next()
}


app.use(cors({
    origin: ['http://ec2-54-196-192-107.compute-1.amazonaws.com', 'http://localhost:5173'],
    credentials: true
}));
app.use((req,res, next) => {
    console.log(req.session)
    next()
})
app.use(express.json())
app.use(compression())


app.use('/api/v1', expensesRouter)
app.use('/api/v1', authRouter)


export default app

