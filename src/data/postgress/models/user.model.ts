import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
export enum UserRole{
    ADMIN = "admin",
    FINDER = "finder",
    PER_OWNER= "pet_owner"
    }



@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", {
        length: 255,
        nullable: false,
    })
    name: string;

    @Column("varchar",{
        length: 255,
        nullable: false,
        unique: true,
    })
    email: string;
    
    @Column("varchar", {
        length: 255,
        nullable: false,
    })
    password: string;

    @Column("enum", {
        enum: UserRole,
        default: UserRole.PER_OWNER,
        nullable: false,

    })
    role: UserRole;
  
    @Column("boolean",{
        default: false,
        nullable: false,
    })
    status: boolean;

    @Column("timestamp",{
        default:() => "CURRENT_TIMESTAMP",
        nullable: false,
    })
    created_in: Date;
}

