import mongoClient from "../db.js";
import bcrypt from 'bcrypt'
const collection = mongoClient.collection('users')

export async function registerUser(req, res){
    const {email, password} = req.body
    const user = await collection.findOne({email})
    if (user) return res.status(400).json({ msg: 'User already exists' })
    const newUser = {email, password}
    bcrypt.hash(password, 7, async (err, hash) => {
        if (err)
            return res.status(400).json({ msg: 'error while saving the password' })

        newUser.password = hash
        const savedUserRes = await collection.insertOne(newUser)

        if (savedUserRes)
            return res.status(200).json({ msg: 'user is successfully saved' })
    })

}


export async function loginUser(req, res){
    const { email, password } = req.body

    const user = await collection.findOne({ email: email }) // finding user in db

    if (!user) {

        return res.status(400).json({ msg: 'User not found.' })
    }

    // comparing the password with the saved hash-password
    const matchPassword = await bcrypt.compare(password, user.password)
    if (matchPassword) {
        const userSession = {email: user.email}
        req.session.user = userSession
        req.session.save((err) => {
            if(req.session.user){
                console.log(req.session)
                return res
                    .status(200)
                    .json({ msg: 'You have logged in successfully', userSession })
            }

        })



    } else {
        return res.status(400).json({ msg: 'Invalid credential' })
    }
}

export async function isAuth(req, res) {
        if (req.session.user) {
            return res.json(req.session.user)
        } else {

            return res.status(401).json('unauthorized')
        }
    }


    export async function logout(req, res){
        req.session.destroy()
        return res.status(200).json("You're logged out.")
    }









