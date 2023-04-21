import {Entity, Column, PrimaryGeneratedColumn, Timestamp, ManyToOne, JoinColumn} from "typeorm"
import {User} from "./user";
import {Post} from "./post";

@Entity({name: 'comments'})
export class Comment {
    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(type => User, user => user.comments, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: number

    @ManyToOne(type => Post, post => post.comments, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'post_id'})
    post: number

    @Column({nullable: false})
    username: string

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date_created: Date;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    date_updated: Date;

    @Column({nullable: false})
    message: string



}