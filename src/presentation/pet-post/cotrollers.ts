import { Request, Response } from "express";
import { RegisterPets } from "./services/register-pet.server";
import { FinderPets } from "./services/finder-Pets.service";
import { FindOnePetService} from "./services/findOne-pet";
import { error } from "console";
import { UpdatePetService } from "./services/updateUser";
import { DeletePetService } from "./services/delete";
import { Reject } from "./services/reject";
import { Approve } from "./services/approve";


export class UserController{

    constructor(
        private readonly registerPetServices: RegisterPets,
        private readonly finderPetServices : FinderPets,
        private readonly  finderPetOne : FindOnePetService,
        private readonly  updatePet: UpdatePetService,
        private readonly deletePet: DeletePetService,
        private readonly rejectPost: Reject,
        private readonly approvePost: Approve,
      ){}

    findAll = (req:Request, res:Response) =>{
      
       this.finderPetServices.execute()
       .then(pet => res.status(200).json(pet) )
       .catch(err => res.status(500).json({message: err.message}))
    };


register =(req:Request, res:Response) =>{
   
    console.log(req.body);

    this.registerPetServices.execute(req.body.userId,req.body)
    .then((message) => res.status(201).json(message))
    .catch((err) => res.status(500).json({message: err.message }))
  };


  findOne = (req: Request, res:Response) =>{
      const {id} = req.params;

   this.finderPetOne.execute(id)
   .then(pet => res.status(200).json(pet))
   .catch(err => res.status(500).json({message: err.message}))

  }



  delete = (req:Request, res: Response) =>{

     const {id} = req.params;
    this.deletePet.execute(id).then(() => res.status(204).json(null))
    .catch((err) => res.status(500).json({message: err.message}))
  }

  update = (req:Request, res: Response) =>{
  
    const {id} = req.params;
   this.updatePet.execute(id, req.body)
  .then((user) => res.status(200).json(user))
  .catch(err => res.status(500).json({message: err.message})) 


}



approve = (req:Request, res: Response) =>{
   const {userId} = req.params;
   console.log("fjaslkfjas"+userId)
 this.approvePost.execute( userId, req.body)
.then((user) => res.status(200).json(user))
.catch(err => res.status(500).json({message: err.message})) 


}
reject = (req:Request, res: Response) =>{

  this.rejectPost.execute( )
 .then((user) => res.status(200).json(user))
 .catch(err => res.status(500).json({message: err.message})) 
 
 
 }


}