import { In } from "typeorm";
import { Pet,StatusRole } from "../../../data/postgress/models/pet.model";

export class FinderPets {

    async execute(){
       try {
        return await Pet.find({
           select:['id', 'Pet_name', 'description','image_url', 'role','create_in'],
          
           where: {
                role: In([StatusRole.COMPLETED, StatusRole.PENDING])
            }
        });
       } catch (error) {
        throw new Error("An error has accured while searching for users")
       }
 }
}