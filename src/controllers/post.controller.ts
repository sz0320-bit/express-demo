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

export const getPosts = async (req, res) => {
    try {
        const posts = await postService.getPosts();
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const likePost = async (req, res) => {
    const postId = req.params.id;
    if(!postId){
        res.status(400).send('no id passed');
    }
    console.log(postId);
    
    const user = req.user.payload;

    const payload = {
        username: user.sub.username,
        userId: user.sub.id,
        postId: postId,
    }
    try {
        const newPost = await postService.addLike(payload);
        res.status(201).send(newPost);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const addPost = async (req, res) => {
    const { title, desc } = req.body;
    const user = req.user.payload;
    console.log(user);
    
    const payload = {
        username: user.sub.username,
        userId: user.sub.id,
        title: title,
        desc: desc,
    }

    try {
        const newPost = await postService.addPost(payload);
        res.status(201).send(newPost);
    } catch (error) {
        res.status(400).send(error.message);
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