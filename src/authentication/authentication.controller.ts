// import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import Controller from '../interfaces/controller.interface';
import validationMiddleware from '../middleware/validation.middleware';
import CreateUserDto from '../users/user.dto';
import userModel from './../users/user.model';
import LogInDto from './logIn.dto';
import TokenData from "../interfaces/tokenData.interface";
import User from "../users/user.interface";
import DataStoredInToken from "../interfaces/dataStoredInToken";


class AuthenticationController implements Controller {
    public path = '/auth'; // 'auth'
    public router = express.Router();
    private user = userModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
        this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
        this.router.post(`${this.path}/logout`, this.loggingOut);
    };

    private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const userData: CreateUserDto = request.body;
        console.log(request.body);
        if (
            await this.user.findOne({email: userData.email})
        ) {
            next(new UserWithThatEmailAlreadyExistsException(userData.email));
        } else {
            // const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = await this.user.create({
                ...userData,
                // password: hashedPassword,
                password: userData.password,
            });
            user.password = undefined;
            const tokenData = this.createToken(user);
            response.setHeader('Auth-Cookie', [this.createCookie(tokenData)]); // Set-Cookie
            response.send(user);
        }
    };

    private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {

        const logInData: LogInDto = request.body;
        const user = await this.user.findOne({email: logInData.email});
        if (user) {
            if (logInData.password == user.password) {
                user.password = undefined;
                const tokenData = this.createToken(user);
                response.setHeader('Auth-Cookie', [this.createCookie(tokenData)]); // Set-Cookie
                response.send(user);
            } else {
                next(new WrongCredentialsException());
            }
        } else {
            next(new WrongCredentialsException());
        }
        console.log(request.body);
    };

    private loggingOut = (request: express.Request, response: express.Response) => {
        response.setHeader('Auth-Cookie', ['Authorization=;Max-age=0']); // Set-Cookie
        response.send(200);
    };

    private createCookie(tokenData: TokenData) {
        return `${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    };

    private createToken(user: User): TokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.JWT_SECRET;
        const dataStoredInToken: DataStoredInToken = {
            _id: user._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, {expiresIn}),
        };
    };
}

export default AuthenticationController;
