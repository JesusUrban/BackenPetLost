import { Request, Response, Router } from "express";
import { UserController } from "./cotrollers";
import { FinderUsers } from "./services/finder-users.service";
import { RegisterUsers } from "./services/register-user.server";
import { FindOneUserService } from "./services/findOne-user";
import { UpdateUserService } from "./services/updateUser";
import { DeleteUserService } from "./services/delete";
import { Login } from "./services/login";





export class UserRoutes{
    static get routes(): Router{
        const router = Router();
     
        const finderUsers = new FinderUsers();
        const registerUsers = new RegisterUsers();
        
        const findOneUser = new FindOneUserService();
        const updateUser = new UpdateUserService();
        const deleteUser = new DeleteUserService();
        const loginUser = new Login();
      
      
        const controller = new UserController(registerUsers,finderUsers,findOneUser, updateUser,deleteUser, loginUser);
        
     
    router.get("/", controller.findAll);
    router.get('/:id', controller.findOne)
    
    router.delete('/:id', controller.delete)
    
    router.patch('/:id', controller.update)


    router.post('/login', controller.login)
    router.post('/register', controller.register)


        return router;
    }
}