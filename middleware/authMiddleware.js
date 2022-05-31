import jwt from 'jsonwebtoken'
import User from '../model/userModel.js'

const protect = async(req, res, next) => {
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        
      try 
      {
          
        let token = req.headers.authorization.split('Bearer ')[1]
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        
        next()
      } catch (error){

        console.error(error);

        res.status(401)

        throw new Error ('Not Authorized, token failed')
      }
    }else{
     res.end('auth required')
    }
  
}

export default protect