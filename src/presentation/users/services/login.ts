import { encriptAdapter, envs, JWtAdapter } from "../../../config";
import { User } from "../../../data/postgress/models/user.model"

export class Login {
    async execute (userData: any){
     // Ensure User Exist
   const user = await this.ensureUserExist(userData.email)
     
   // compare the password to see if it is correct
   this.ensurePasswordCorrec(userData.password, user!.password );
    
  //Generate a token
  const token = await this.generateToken({id: user!.id}, envs.JWT_KEY_IN)
    

   //4 Return the token
   return {
    token,
    user:{
        id: user?.id,
        email: user?.email,
        status: user?.status,
        role: user?.role
    }
 } 
   
    }

    private async ensureUserExist(email: string){
          const user = await User.findOne({
         where :{
               email: email,
               status: true,
            },
          });

          if(!user){
            throw new Error(`User not Found`)
        
          }
          return user;
    }
      
    private ensurePasswordCorrec(
        unHashedPassword:string, 
        hashedPassword:string  
    ){
        const isMatch = encriptAdapter.compare(unHashedPassword,hashedPassword)
   
        if(!isMatch){
            throw new Error('The user, password or both are incorrect ')
        }
   
    }
    
    private async generateToken(payload: any, duration: string){

      const token = await JWtAdapter.generateToken(payload, duration);

      if(!token) throw new Error("Error while creating the token: JWT");

      return token;
  }

}