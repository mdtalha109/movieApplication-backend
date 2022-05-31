import bcrypt from 'bcryptjs'
import User from '../model/userModel.js'
import generateToken from '../utils/generateToken.js'


const userSignup = async(req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(402).json('all fields are required')
        return;
    }

    const isUserPresent = await User.findOne({email})
    if(isUserPresent){
        res.status(402).json({error: 'user already exist'})
        return
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // creating user
    const user = await User.create({
        username: name,
        email,
        password: hashedPassword
    })


    if(user){
        res.json({
            id: user._id,
            name: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
    }
}

const userLogin = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(402).json({error: "All fields are required"})
    }
    const user = await User.findOne({email})
    if(user && await bcrypt.compare(password, user.password)){
        res.json({
            id: user._id,
            name: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else{
        return res.status(400).json({
            message: 'Email or password incorrect' 
        })
    }
}
export {userSignup, userLogin}