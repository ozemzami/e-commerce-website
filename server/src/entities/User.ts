import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

export interface IUser {
    id?: number,
    name: string,
    email: string,
    pwdHash: string
}

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    pwdHash!: string;

}