import { Request, Response, Router } from "express";
import { UserController } from "./cotrollers";
import { FinderUsers } from "./services/finder-users.service";
import { RegisterUsers } from "./services/register-user.server";
import { FindOneUserService } from "./services/findOne-user";
import { UpdateUserService } from "./services/updateUser";
import { DeleteUserService } from "./services/delete";
import { Login } from "./services/login";
import { AuthMiddleware } from "../common/middlewares/auth.middleware";
import { UserRole } from "../../data/postgress/models/user.model";





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
        
     router.post('/login', controller.login)
    router.post('/register', controller.register)

      // middleware for public routes

      //To get access to the cookes we need to install cookie-parser
      router.use(AuthMiddleware.protect)

    router.get("/", AuthMiddleware.restrictTo(UserRole.ADMIN), controller.findAll);
    router.get('/:id', controller.findOne)
    
    router.delete('/:id',AuthMiddleware.restrictTo(UserRole.ADMIN), controller.delete)
    
    router.patch('/:id', AuthMiddleware.restrictTo(UserRole.ADMIN, UserRole.PER_OWNER) ,controller.update)


    

        return router;
    }
}