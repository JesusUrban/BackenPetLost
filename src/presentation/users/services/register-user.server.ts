import { encriptAdapter } from "../../../config";
import { User } from "../../../data/postgress/models/user.model";

export class RegisterUsers {

    async execute( userData: any){
        const user = new User();
       
       user.name = userData.name;
       user.email = userData.email;
       user.password =this.encriptPassword(userData.password);
       user.status = userData.status;
       user.role = userData.role;
     try {
        await user.save();

         return {
            message: 'User created successfully'
         };
  
    } catch (error) {
        console.log(error)
        throw new Error('An error accured while registering the user')
     }
     
       return{
            Message: "User Registered successfully",
        userData,
    }
}


//Method for encrypting the password

private encriptPassword(password: string): string {


    return encriptAdapter.hash(password);
  }
}