import { userModel } from "../../../DB/models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from "../../services/sendEmailSevice.js";
import { generateToken , verifyToken } from "../../utils/tokenfunctions.js";
//=======================SIGN UP==================================
export const SignUp = async (req , res, next) => {
    const { userName, email, role ,password, gender , address , phoneNumber} = req.body
  
    // email check
    const isUserExists = await userModel.findOne({ email })
    if (isUserExists) {
      return res.status(400).json({ message: 'Email is already exists' })
    }
  
    // confirmEmail
    const token = generateToken({
      payload: {
        email,
      },
      signature: process.env.CONFIRMATION_EMAIL_TOKEN,
      expiresIn: '1h',
    })
  
    if (!token) {
      
      return res.status(400).json({ message: 'no token created'})
    }
  
    const confirmLink = `${req.protocol}://${req.headers.host}/user/confirmEmail/${token}`
  
    const message = `<a href=${confirmLink}> Click to confirm your email </a>`
  
    const isEmailSent = await sendEmail({
      message,
      to: email,
      subject: 'Confiramtion Email',
    })
    if (!isEmailSent) {
      return res
        .status(500)
        .json({ message: 'Please try again later or contact teh support team' })
    }
  
    const hashedPassword = bcrypt.hashSync(password, +process.env.saltRound)
    const user = new userModel({
      userName,
      email,
      role,
      password: hashedPassword,
      gender,
      phoneNumber,
      address
    })
    await user.save()
    res.status(201).json({ message: 'Done', user})
  }
  
  //================================== Confirm email =====================
  export const confirmEmail = async (req, res, next) => {
    const { token } = req.params
    // const decodedData = jwt.verify(token, process.env.CONFIRMATION_EMAIL_TOKEN)
    const decodedData = verifyToken({
      token,
      signature: process.env.CONFIRMATION_EMAIL_TOKEN,
    })
    if (!decodedData) {
       return res.status(400).json({ message: 'no decoded token'})
    }
  
    const isConfirmedCheck = await userModel.findOne({ email: decodedData.email })
    if (isConfirmedCheck.isConfirmed) {
      return res.status(400).json({ message: 'Your email is already confirmed' })
    }
    const user = await userModel.findOneAndUpdate(
      { email: decodedData.email },
      { isConfirmed: true },
      {
        new: true,
      },
    )
    res.status(200).json({ message: 'Confirmed Done please try to login', user })
  }
  
  //================================== signIn ============================
  export const SignIn = async (req, res, next) => {
    const { email, password } = req.body
    const isUserExists = await userModel.findOne({ email, isConfirmed: true })
    if (!isUserExists) {
      return res.status(400).json({ message: 'in-valid login credentails'})
    }
    const passMatch = bcrypt.compareSync(password, isUserExists.password) // true , false
    if (!passMatch) {
      return res.status(400).json({ message: 'in-valid login credentails'})
    }
  
    const userToken = generateToken({
      payload: {
        useremail: email,
        id: isUserExists._id,
      },
      signature: process.env.SIGN_IN_TOKEN_SECRET,
      expiresIn: '1d',
    })
  
    if (!userToken) {
      return res.status(200).json({ message: 'token generation fail, payload canot be empty'})
    }
    isUserExists.token = userToken
    await isUserExists.save()
   return res.status(200).json({ message: 'LoggedIn success', userToken  , isUserExists})
  }
  
  