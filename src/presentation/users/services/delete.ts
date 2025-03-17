import { User } from "../../../data/postgress/models/user.model";

export class DeleteUserService{
    async execute(userId: string){


        const user = await this.ensureUserExists(userId);
        user.status = false; // this is called
        
        try {
            await user.save();
        } catch (error) {
            throw new Error ('An error occurred while deleting the user')
        }
    }











        // find that user if it exist
        private async ensureUserExists(userId: string){
        const user = await User.findOne({
            select: ['id'],
            where: {
                id: userId,
                status:true,
            },
        });

        if (!user){
            throw new Error(`User with id: ${userId} not found`)
        }
           return user;
        }
    

}