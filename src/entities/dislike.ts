import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Post } from './post';

@Entity({ name: 'dislikes' })
export class Dislike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  username: string;

  @ManyToOne(() => Post, post => post.dislikes)
  post: Post;
}
