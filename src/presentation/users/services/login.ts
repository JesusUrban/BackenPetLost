import { envs } from "../../../config";
import { User } from "../../../data/postgress/models/user.model"
import * as jwt from 'jsonwebtoken';

export class Login {
    async execute (userData: any){
     

        
        const user= await User.findOne({
            select: ['id', 'name', 'password'],
            where: {
                name:userData.name,
                status: true
            }
           }) 
     
        if (!user) {
            throw new Error(`The username or password is incorrect.`);
        }

        if (user.password !== userData.password) {
            throw new Error(`The username or password is incorrect.`);
        }

 
        const token = jwt.sign(
            { id: user.id, name: user.name },
             envs.JWT_SECRET || '1234',
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        return {
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name
            }
        };
    
    }

}