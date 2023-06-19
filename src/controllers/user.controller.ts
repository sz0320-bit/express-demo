import userService from '../services/user.service';
import {Request, Response} from "express";
import {CreateUserRequestBody} from "../models/sign-up";

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const addUser = async (req, res) => {
    const { username, profile_pic, password, email } = req.body;

    try {
        const newUser = await userService.addUser(req.body);
        if (newUser.error) {
            throw new Error(newUser.error);
        }
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send(error);
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
