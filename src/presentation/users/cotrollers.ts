import { Request, Response } from "express";
import { RegisterUsers } from "./services/register-user.server";
import { FinderUsers } from "./services/finder-users.service";
import { FindOneUserService } from "./services/findOne-user";
import { error } from "console";
import { UpdateUserService } from "./services/updateUser";
import { DeleteUserService } from "./services/delete";
import { Login } from "./services/login";


export class UserController{

    constructor(
        private readonly registerUserServices: RegisterUsers,
        private readonly finderUserServices : FinderUsers,
        private readonly  finderUserOne : FindOneUserService,
        private readonly  updateUser: UpdateUserService,
        private readonly deleteUser: DeleteUserService,

        private readonly loginService: Login,
      ){}

    findAll = (req:Request, res:Response) =>{
      
       this.finderUserServices.execute()
       .then(users => res.status(200).json(users) )
       .catch(err => res.status(500).json({message: err.message}))
    };


register =(req:Request, res:Response) =>{
   
    console.log(req.body);

    this.registerUserServices.execute(req.body)
    .then((message) => res.status(201).json(message))
    .catch((err) => res.status(500).json({message: err.message }))
  };


  findOne = (req: Request, res:Response) =>{
      const {id} = req.params;

   this.finderUserOne.execute(id)
   .then(user => res.status(200).json(user))
   .catch(err => res.status(500).json({message: err.message}))

  }



  delete = (req:Request, res: Response) =>{

     const {id} = req.params;
    this.deleteUser.execute(id).then(() => res.status(204).json(null))
    .catch((err) => res.status(500).json({message: err.message}))
  }

  update = (req:Request, res: Response) =>{
  
    const {id} = req.params;
    
   this.updateUser.execute(id, req.body)
  .then((user) => res.status(200).json(user))
  .catch(err => res.status(500).json({message: err.message})) 


}

login = (req:Request, res: Response) =>{

 this.loginService.execute( req.body)
.then((user) => res.status(200).json(user))
.catch(err => res.status(500).json({message: err.message})) 


}
}