"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.deleteUser = exports.addUser = exports.getUserById = void 0;
const user_service_1 = __importDefault(require("../services/user.service"));
const getUserById = async (req, res) => {
    try {
        const user = await user_service_1.default.getUserById(req.params.id);
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getUserById = getUserById;
const addUser = async (req, res) => {
    const { username, profile_pic, password, email } = req.body;
    try {
        const newUser = await user_service_1.default.addUser(req.body);
        res.status(201).send(newUser);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.addUser = addUser;
const deleteUser = async (req, res) => {
    try {
        const message = await user_service_1.default.deleteUser(req.params.id);
        res.status(200).send(message);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.deleteUser = deleteUser;
const getAllUsers = async (req, res) => {
    try {
        const users = await user_service_1.default.getAllUsers();
        res.status(200).send(users);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getAllUsers = getAllUsers;
