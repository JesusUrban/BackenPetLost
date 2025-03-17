import { In } from "typeorm";
import { Pet, StatusRole } from "../../../data/postgress/models/pet.model";


export class FindOnePetService {
    async execute(userId: string){
      const pet= await Pet.findOne({
        select:['id', 'Pet_name', 'description','image_url', 'role','create_in'],
            where: {
                id: userId,
                     role: In([StatusRole.COMPLETED, StatusRole.PENDING])
                            
            }
           }) 
        if(!pet){
            throw new Error(`User with id: ${userId} not found`)
        }
        return pet;
    }
}