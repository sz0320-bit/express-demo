import {Entity, Column, PrimaryGeneratedColumn, Timestamp, ManyToOne, JoinColumn} from "typeorm"
import {User} from "./user";

@Entity({name: 'posts'})
export class Post {
    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(type => User, user => user.posts)
    @JoinColumn({name: 'user_id'})
    user: number

    @Column({nullable: false})
    username: string

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date_created: Date;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date_updated: Date;

    @Column({nullable: false})
    title: string

    @Column({nullable: false})
    description: string
}