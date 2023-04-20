import {Entity, Column, PrimaryGeneratedColumn, Timestamp, OneToMany} from "typeorm"
import {Post} from "./post";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    username: string

    @Column({
        nullable: true,
    })
    profile_pic: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date_created: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date_updated: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" , nullable: true})
    last_online: Date;

    @OneToMany(type => Post, post => post.user, {onDelete: 'CASCADE'})
    posts: Post[]
}