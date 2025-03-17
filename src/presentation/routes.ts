import {  Router } from "express";
import { UserRoutes } from "./users/routes";
import { PetRoutes } from "./pet-post/routes";



export class AppRoutes{
    static get routes(): Router{
        const router = Router();
      
       
        router.use("/api/users", UserRoutes.routes)
        router.use("/api/petpost", PetRoutes.routes)


        return router;
    }
}