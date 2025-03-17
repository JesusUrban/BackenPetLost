import { DataSource } from "typeorm";
import { User } from "./models/user.model";
import { Pet } from "./models/pet.model";


interface Options{
   host: string;
   port: number;
   username: string;
   password: string;
   database: string;
}

/*
  Class to manage the coneccion to a database   
  to the entities User, Pet, Doctor , ....
  THe connection is made to synchonize the squeme of the data base

  It use SSL WITH rejectUnauthorized: false to prevent error in the development enviroment

*/

export class PostgresDatabse{
 
    public datasource: DataSource;

/*






*/


    constructor(options: Options){
             this.datasource = new DataSource({
                type: "postgres",
                host: options.host,
                port: options.port,
                username: options.username,
                password: options.password,
                database: options.database,
                synchronize:true,
                entities:[User,Pet],
                
                ssl: {
                    rejectUnauthorized: false,
                },

            

             });
    }


    /*
    *@remarks 
    this method must be called to make a connection with the data base
    *@return   A Promese 

    
    
    
    */
    async connect(){
        try {
            await this.datasource.initialize();
            console.log("database conected successfully😀😀😀")
        } catch (error) {
            console.log(error)
        }
    }
}