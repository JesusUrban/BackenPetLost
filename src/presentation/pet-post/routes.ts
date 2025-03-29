import { Request, Response, Router } from "express";
import { UserController } from "./cotrollers";
import { FinderPets } from "./services/finder-Pets.service";
import { RegisterPets} from "./services/register-pet.server";
import { FindOnePetService } from "./services/findOne-pet";
import { UpdatePetService } from "./services/updateUser";
import { DeletePetService } from "./services/delete";
import { Approve } from "./services/approve";
import { Reject } from "./services/reject";
import { AuthMiddleware } from "../common/middlewares/auth.middleware";
import { UserRole } from "../../data/postgress/models/user.model";





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
        
     


          //To get access to the cookes we need to install cookie-parser
              router.use(AuthMiddleware.protect)

    router.get("/", controller.findAll);
    router.get('/:id', controller.findOne)

    
    router.post("/", AuthMiddleware.restrictTo(UserRole.ADMIN),controller.register);

    
    router.delete('/:id', AuthMiddleware.restrictTo(UserRole.ADMIN, UserRole.PER_OWNER),controller.delete)

    
    router.patch('/:id',AuthMiddleware.restrictTo(UserRole.ADMIN, UserRole.PER_OWNER), controller.update)
     

    router.patch('/:id/approve', controller.approve)
    router.patch('/:id/reject', controller.reject)


    





        return router;
    }
}