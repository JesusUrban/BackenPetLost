import { User } from "../../../data/postgress/models/user.model"

export class FindOneUserService {
    async execute(userId: string){
      const user= await User.findOne({
            select: ['id', 'name','password' ,'email', 'status', 'role'],
            where: {
                id: userId,
                status: true
            }
           }) 
        if(!user){
            throw new Error(`User with id: ${userId} not found`)
        }
        return user;
    }
}