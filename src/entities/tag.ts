import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm"
import {Post} from "./post";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @ManyToMany(() => Post, post => post.tags)
    posts: Post[]
}