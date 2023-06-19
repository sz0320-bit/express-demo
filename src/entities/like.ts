import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Post } from './post';

@Entity({ name: 'likes' })
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  username: string;

  @ManyToOne(() => Post, post => post.likes)
  post: Post;
}
