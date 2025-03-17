

export enum StatusRole{
  PENDING = "pending",
  CANCEL = "cancel",
  COMPLETED ="completed"
}

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pet extends BaseEntity{
  @PrimaryGeneratedColumn("uuid") 
    id: string;
    
    @Column("varchar",{
        length: 100,
        nullable: false,
       
    })
    userId: string;

    @Column("varchar", {
        length: 70,
        nullable: false,
    })
    Pet_name: string;

    @Column("text",{
        nullable: false,
    })
    description: string;

    @Column("varchar", {
        length: 100,
        nullable: false,
    })
    image_url: string;

    @Column("enum", {
        enum: StatusRole,
        default: StatusRole.PENDING,
        nullable: false,
    })
    role: StatusRole;

    @Column("boolean", {
        default: false,
        nullable: false,
    })
  wasFound: boolean;

  @Column("timestamp", {
    default:() => "CURRENT_TIMESTAMP",
    nullable:false,
  })
  create_in: Date;

   // TODO: add relationship with user and species

}