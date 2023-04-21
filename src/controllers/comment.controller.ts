import commentService from "../services/comment.service";

export const getCommentsByPostId = async (req, res) => {
    console.log(req.params.id)
    try {
        const comments = await commentService.getCommentsByPostId(req.params.id);
        res.status(200).send(comments);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const getCommentsByUserId = async (req, res) => {
    console.log(req.params.id)
    try {
        const comments = await commentService.getCommentsByUserId(req.params.id);
        res.status(200).send(comments);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const addComment = async (req, res) => {
    const {username, userId, message, postId} = req.body;

    try {
        const newComment = await commentService.addComment(req.body);
        res.status(201).send(newComment);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

export const deleteComment = async (req, res) => {
    try {
        const message = await commentService.deleteComment(req.params.id);
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send(error.message);
    }
}