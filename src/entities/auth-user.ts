import {Entity, Column, PrimaryGeneratedColumn, Timestamp, OneToOne, JoinColumn, BeforeInsert} from "typeorm"
import {User} from "./user";
import * as bcrypt from 'bcrypt';


@Entity({name: 'auth_users'})
export class AuthUser {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string
    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }

    @Column()
    email: string

    @OneToOne(() => User, {onDelete: 'CASCADE', nullable: false})
    @JoinColumn({name: 'profile_id'})
    profile_id: User
}