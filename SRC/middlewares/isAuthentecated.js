import { userModel } from '../../DB/models/user.model.js'
import { generateToken, verifyToken } from '../utils/tokenfunctions.js'

export const isAuth = (roles) => {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers
      if (!authorization) {
        return res.status(400).json({message:'Please login first'} )
      }
      if (!authorization.startsWith('start')) {
        return res.status(400).json({message:'invalid token prefix'})
      }
      console.log(authorization)
      const splitedToken = authorization.split(' ')[1]
      console.log({splitedToken})  
     const decodedData = verifyToken({
          token: splitedToken, 
          signature: process.env.SIGN_IN_TOKEN_SECRET,
        })
        console.log({decodedData})
        const findUser = await userModel.findById(
          decodedData.id,
        )
        if (!findUser) {
          return res.status(400).json({message:'Please SignUp'})
        }
        //============authorization==============
        
        if (!roles.includes(findUser.role)) {
            return res.status(500).json({ message: 'un authorized user'})
          }
        
      
        req.authUser = findUser
        next()

    }
       catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'error'})
    }
  }
}



