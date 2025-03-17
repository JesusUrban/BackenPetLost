import { Pet } from "../../../data/postgress/models/pet.model";
import { User } from "../../../data/postgress/models/user.model";
import { RegisterPets } from "./register-pet.server";

export class Approve{
             

    async execute(userId:string, petdata:any){

     
        const user = await this.ensureUserExists(userId);

       const registerPets = new RegisterPets();
        
       try {

        const result = await registerPets.execute(user.id,petdata);
        console.log(result); 
       
        return{
            Message: "Post Registered successfully",
            result,
        }
    } catch (error) {
        console.log(error)
        throw new Error('An error accured while registering the user')
    }

    }


private async ensureUserExists(userId: string){
    console.log('I was 2'+ userId)
    const user = await User.findOne({
      
        select: ['id'],
        where: {
            id: userId,
           
        },
    });
    

    if (!user){
        throw new Error(`You cannot make a post because your id: ${userId} was not found`)
    }
  
       return user;
    }

 }

