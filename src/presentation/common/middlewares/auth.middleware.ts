import { NextFunction, Request, Response } from "express";
import { JWtAdapter } from "../../../config";
import { User, UserRole } from "../../../data/postgress/models/user.model";

export class AuthMiddleware{

    static async protect(
      req: Request, res: Response, next: NextFunction){
const token = req.cookies.token;
console.log(token);

if(!token) return res.status(401).json({message: 'No token provided'});
   
try {
    const payload = (await JWtAdapter.validateToken(token))as {id: string};
    
    if(!payload) return res.status(401).json({message: 'Invalid token'})

      const user = await User.findOne({
         where: {
          id: payload.id,
          status: true
         }
      })

      if(!user) return res.status(401).json({message:'Invalid User'})
    
        req.body.sessionUser =user;
        next();

   } catch (error) {
    console.error(error)
    return res.status(500).json({message: 'Internal server Error.....'})
   }

  }

  static restrictTo = (...roles:UserRole[]) =>{
    return (req: Request, res: Response, next: NextFunction) =>{
     
     if(!roles.includes(req.body.sessionUser.role)){
        return res.status(403).json({message: 'You are not authorized for accessing this route'})
     }
     next();
     
      console.log(req.body.sessionUser)
    }
  }
  
}