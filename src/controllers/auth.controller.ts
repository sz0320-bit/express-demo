import {Router} from 'express';
import AuthService from "../services/auth.service";
import {JwtService} from "../middleware/jwt";



export const login = async (req, res) => {
    const {username, password} = req.body;
    const user = await AuthService.validateUser(username, password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = JwtService.generateToken(user);
    res.json({ access_token: token });
}
