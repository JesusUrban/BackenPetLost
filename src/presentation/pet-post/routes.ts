import { Request, Response, Router } from "express";
import { UserController } from "./cotrollers";
import { FinderPets } from "./services/finder-Pets.service";
import { RegisterPets} from "./services/register-pet.server";
import { FindOnePetService } from "./services/findOne-pet";
import { UpdatePetService } from "./services/updateUser";
import { DeletePetService } from "./services/delete";
import { Approve } from "./services/approve";
import { Reject } from "./services/reject";





export class PetRoutes{
    static get routes(): Router{
        const router = Router();
     
        const finderPets = new FinderPets();
        const registerPet = new RegisterPets();
        
        const findOnePet = new FindOnePetService();
        const updatePet = new UpdatePetService();
        const deletePet = new DeletePetService();
        const approvePost = new Approve();
        const rejectPost = new Reject();
      
      
        const controller = new UserController(registerPet,finderPets,findOnePet, updatePet,deletePet,rejectPost,approvePost);
        
     
    router.get("/", controller.findAll);
    router.get('/:id', controller.findOne)

    
    router.post("/", controller.register);

    
    router.delete('/:id', controller.delete)

    
    router.patch('/:id', controller.update)
     

    router.patch('/:id/approve', controller.approve)
    router.patch('/:id/reject', controller.reject)


    





        return router;
    }
}