import { Pet } from "../../../data/postgress/models/pet.model";

export class RegisterPets {
       
    async execute(userId:string, petData: any){
        const pet = new Pet();

        if(userId){
           pet.userId= userId;  
        }else{
            pet.userId=petData.userId;
        }
      
       pet.Pet_name = petData.Pet_name;
       pet.description = petData.description;
       pet.image_url = petData.image_url;
       pet.role = petData.role;
       pet.wasFound = petData.wasFound;
     try {
        await pet.save();

         return {
            message: 'User created successfully'
         };
  
    } catch (error) {
        console.log(error)
        throw new Error('An error accured while registering the user')
     }
     
       return{
            Message: "Post Created  successfully",
        petData,
    }
}

}