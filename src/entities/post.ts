import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Timestamp,
    ManyToOne,
    JoinColumn,
    OneToMany,
    JoinTable,
    ManyToMany,
} from "typeorm"
import {User} from "./user";
import {Comment} from "./comment";
import {Tag} from "./tag";
import { Like } from "./like";
import { Dislike } from "./dislike";

@Entity({name: 'posts'})
export class Post {
    @PrimaryGeneratedColumn()
    id: number


    @ManyToOne(type => User, user => user.posts, {onDelete: 'CASCADE'})
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

    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[]

    @OneToMany(type => Like, like => like.post)
    likes: Like[]

    @OneToMany(type => Dislike, dislike => dislike.post)
    dislikes: Dislike[]

    @ManyToMany(() => Tag, tag => tag.posts)
    @JoinTable()
    tags: Tag[]
}