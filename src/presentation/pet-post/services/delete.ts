import { Pet, StatusRole} from "../../../data/postgress/models/pet.model";


export class DeletePetService{
    async execute(petId: string){


        const pet = await this.ensureUserExists(petId);
        pet.role = StatusRole.CANCEL ; // this is called 
        
        try {
            await pet.save();
        } catch (error) {
            throw new Error ('An error occurred while deleting the user')
        }
    }











        // find that user if it exist
        private async ensureUserExists(petId: string){
        const pet = await Pet.findOne({
            select: ['id'],
            where: {
                id: petId,
                wasFound:false,
            },
        });

        if (!pet){
            throw new Error(`User with id: ${petId} not found`)
        }
           return pet;
        }
    

}