import myDataSource from "../app-data-source";
import { Like } from "../entities/like";
import {Post} from "../entities/post";
import {User} from "../entities/user";
import {DeepPartial} from "typeorm";

const postRepository = myDataSource.manager.getRepository(Post);
const userRepository = myDataSource.manager.getRepository(User);
const likeRepository = myDataSource.manager.getRepository(Like);

class UserService {
    async getPostsById(id) {
        const user = await userRepository.findOne({
            where: {
                id
            },
            relations: ['posts']
        });
        return user.posts || [];
    }

    async getPosts() {
        const posts = await postRepository.find({
            relations: ['likes']
        });
        return posts || [];
    }

      async addLike ({postId, userId, username}){
      
        try {
          
      
          const post = await postRepository.findOne({ 
            where: {
                id: postId
            },
            relations: ['likes'] 
        });
          if (!post) {
            throw new Error('Post not found');
          }
      
          console.log(post);
          
          const existingLike = post.likes.find((like) => like.userId === userId);
          if (existingLike) {
            throw new Error('User already liked this post');
          }
      
          const newLike = new Like();
          newLike.userId = userId;
          newLike.username = username;
          newLike.post = post;
      
          await likeRepository.save(newLike);
      
         return { message: 'Like added successfully' };
        } catch (error) {
          console.error(error);
          throw new Error(
            error.message,
          );
        }
      };

    async addPost(payload) {
        
        if (!payload.username || !payload.userId || !payload.title || !payload.desc) {
            throw new Error('Values are required.');
        }

        try {
            const newPost: DeepPartial<Post> = {
                username: payload.username,
                user: payload.userId,
                description: payload.desc,
                title: payload.title,
                date_created: new Date(),
                date_updated: new Date(),
            }

            if(payload.tags){
                newPost.tags = payload.tags;
            }

            await postRepository.save(
                postRepository.create(newPost)
            );

            return newPost;
        } catch (error) {
            console.log(error);
            return {
                message: 'Error',
                error: error.message,
            };
        }
    }

    async deletePost(id) {
        const result = await postRepository.delete({id: id});

        if (result.affected) {
            return `Successfully deleted post ${id}.`;
        } else {
            throw new Error('No post found with that ID.');
        }
    }

}

export default new UserService();