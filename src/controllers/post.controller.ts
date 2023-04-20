import postService from "../services/post.service";

export const getPostsById = async (req, res) => {
    console.log(req.params.id)
    try {
        const posts = await postService.getPostsById(req.params.id);
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }
}



export const addPost = async (req, res) => {
    const { username, userId, title, desc } = req.body;

    try {
        const newPost = await postService.addPost(req.body);
        res.status(201).send(newPost);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const deletePost = async (req, res) => {
    try {
        const message = await postService.deletePost(req.params.id);
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send(error.message);
    }
}