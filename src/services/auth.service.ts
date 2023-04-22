import { compare } from 'bcrypt';
import {AuthUser} from "../entities/auth-user";
import myDataSource from "../../app-data-source";
import jwt from 'jsonwebtoken';

const userRepository = myDataSource.manager.getRepository(AuthUser);
 class AuthService {
    async validateUser(username: string, password: string): Promise<AuthUser | null> {
        const user = await userRepository.findOne({ where: { username } });
        if (user && await compare(password, user.password)) {
            // The password is correct
            return user;
        }
        // The username or password is incorrect
        return null;
    }

    async login(user: AuthUser): Promise<string> {
        const payload = { sub: user.id };
        // return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return 'Logged In'
    }



}




export default new AuthService();
