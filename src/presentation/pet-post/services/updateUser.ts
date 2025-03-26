import { Pet } from "../../../data/postgress/models/pet.model";


export class UpdatePetService {
    async execute (petId: string, petData: any){
     
      const pet = await this.ensureUserExist(petId);


     pet.Pet_name = petData.Pet_name;
     
     pet.description= petData.description
     pet.image_url = petData.image_url;
     pet.role = petData.role
     

     try {
         await pet.save();
         const message: string=`Post with id ${petId} was updated `;
         return{
            message:  message
         }
     } catch (error) {
        throw new Error('An error occurred while updating the user');
     }
     
      
    }





//user validation
    private async ensureUserExist(userId: string) : Promise<Pet>{
      const pet = await Pet.findOne({
         select: ['id'],
           where: {
               id: userId,
               wasFound: false,
           },
        });
   
        if(!pet){
           throw new Error(`User with id: ${userId} not found`);
   
        }
        return pet;
   
    }

}