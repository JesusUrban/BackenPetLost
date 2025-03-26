import { User } from "../../../data/postgress/models/user.model"

export class UpdateUserService {
    async execute (userId: string, userData: any, ){
     
      const user = await this.ensureUserExist(userId);
     
      if (user.role == 'admin' || user.id == userId) {
       
   
    user.name = userData.name;
     user.email = userData.email;
     user.password = userData.password;
     
     

     try {
         await user.save();
         const message: string=`User with id ${userId} was updated `;
         return{
            message:  message
         }
     } catch (error) {
        throw new Error('An error occurred while updating the user');
     }
     
      
    }else{
        throw new Error('Unauthorized action: only admins or the user can update this data'); 
    }
   
    }


    





//user validation
    private async ensureUserExist(userId: string) : Promise<User>{
      const user = await User.findOne({
         select: ['id'],
           where: {
               id: userId,
               status: true,
               
           },
        });
   
        if(!user){
           throw new Error(`User with id: ${userId} not found`);
   
        }
        return user;
   
    }

}