import myDataSource from "../app-data-source";
import { Dislike } from "../entities/dislike";
import { Like } from "../entities/like";
import { Post } from "../entities/post";
import { User } from "../entities/user";
import { DeepPartial } from "typeorm";

const postRepository = myDataSource.manager.getRepository(Post);
const userRepository = myDataSource.manager.getRepository(User);
const likeRepository = myDataSource.manager.getRepository(Like);
const dislikeRepository = myDataSource.manager.getRepository(Dislike);

class UserService {
  async getPostsById(id) {
    const user = await userRepository.findOne({
      where: {
        id,
      },
      relations: ["posts"],
    });
    return user.posts || [];
  }

  async getPosts() {
    const posts = await postRepository.find({
      relations: ["likes", "dislikes"],
    });
    return posts || [];
  }

  async addLike({ postId, userId, username }) {
    const queryRunner = myDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let post = await postRepository.findOne({
        where: {
          id: postId,
        },
        relations: ["likes", "dislikes"],
      });
      if (!post) {
        throw new Error("Post not found");
      }

      console.log(post);

      const existingLike = post.likes.find((like) => like.userId === userId);
      if (existingLike) {
        throw new Error("User already liked this post");
      }

      const existingDislike = post.dislikes.find(
        (dislike) => dislike.userId === userId
      );
      if (existingDislike) {
        await queryRunner.manager.delete(Dislike, {
          userId: userId,
          post: Number.parseInt(postId),
        });
      }

      const newLike = new Like();
      newLike.userId = userId;
      newLike.username = username;
      newLike.post = post;

      await queryRunner.manager.save(queryRunner.manager.create(Like, newLike));
      await queryRunner.commitTransaction();

      post = await postRepository.findOne({
        where: {
          id: postId,
        },
        relations: ["dislikes", "likes"],
      });

      return post;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      throw new Error(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async removeDislike({ postId, userId, username }) {
    const queryRunner = myDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(Dislike, {
        userId: userId,
        post: Number.parseInt(postId),
      });
      queryRunner.commitTransaction();
      let post = await postRepository.findOne({
        where: {
          id: postId,
        },
        relations: ["dislikes", "likes"],
      });
      return post;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      throw new Error(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async removeLike({ postId, userId, username }) {
    const queryRunner = myDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(Like, {
        userId: userId,
        post: Number.parseInt(postId),
      });
      queryRunner.commitTransaction();
      let post = await postRepository.findOne({
        where: {
          id: postId,
        },
        relations: ["dislikes", "likes"],
      });
      return post;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      throw new Error(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async addDislike({ postId, userId, username }) {
    const queryRunner = myDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let post = await postRepository.findOne({
        where: {
          id: postId,
        },
        relations: ["dislikes", "likes"],
      });
      if (!post) {
        throw new Error("Post not found");
      }

      console.log(post);

      const existingDislike = post.dislikes.find(
        (like) => like.userId === userId
      );
      if (existingDislike) {
        throw new Error("User already disliked this post");
      }

      const existingLike = post.likes.find((like) => like.userId === userId);
      if (existingLike) {
        await queryRunner.manager.delete(Like, {
          userId: userId,
          post: Number.parseInt(postId),
        });
      }

      const newDislike = new Dislike();
      newDislike.userId = userId;
      newDislike.username = username;
      newDislike.post = post;

      await queryRunner.manager.save(
        queryRunner.manager.create(Dislike, newDislike)
      );
      await queryRunner.commitTransaction();

      post = await postRepository.findOne({
        where: {
          id: postId,
        },
        relations: ["dislikes", "likes"],
      });
      return post;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      throw new Error(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async addPost(payload) {
    if (
      !payload.username ||
      !payload.userId ||
      !payload.title ||
      !payload.desc
    ) {
      throw new Error("Values are required.");
    }

    try {
      const newPost: DeepPartial<Post> = {
        username: payload.username,
        user: payload.userId,
        description: payload.desc,
        title: payload.title,
        date_created: new Date(),
        date_updated: new Date(),
        likes: [],
        dislikes: [],
      };

      if (payload.tags) {
        newPost.tags = payload.tags;
      }

      const result = await postRepository.save(postRepository.create(newPost));
      delete result.user;
      return result;
    } catch (error) {
      console.log(error);
      return {
        message: "Error",
        error: error.message,
      };
    }
  }

  async deletePost(id) {
    const result = await postRepository.delete({ id: id });

    if (result.affected) {
      return `Successfully deleted post ${id}.`;
    } else {
      throw new Error("No post found with that ID.");
    }
  }
}

export default new UserService();
