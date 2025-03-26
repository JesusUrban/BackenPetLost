import { User } from "../../../data/postgress/models/user.model"

export class FinderUsers {

    async execute(){
       try {
        return await User.find({
           select:['id', 'name','password','email','status', 'role'],
          
           where: {
                status: true,
            }
        });
       } catch (error) {
        throw new Error("An error has accured while searching for users")
       }
 }
}