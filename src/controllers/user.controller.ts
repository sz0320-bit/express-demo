import userService from '../services/user.service';

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const addUser = async (req, res) => {
    try {
        const newUser = await userService.addUser(req.body);
        res.status(201).send('User successfully created!');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const message = await userService.deleteUser(req.params.id);
        res.status(200).send(message);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
