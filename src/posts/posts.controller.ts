import * as express from 'express';
import validationMiddleware from '../middleware/validation.middleware';
import Controller from '../interfaces/controller.interface';
import Post from './posts.interface';
import postModel from './posts.model';
import HttpException from "../exceptions/HttpException";
import PostNotFoundException from "../exceptions/PostNotFoundException";
// import { NextFunction } from 'express';
import CreatePostDto from './post.dto';

class PostsController implements Controller {
    public path = '/posts';
    public router = express.Router();
    private post = postModel;

    // private posts: Post[] = [
    //     {
    //         author: 'Artur',
    //         content: 'Dolor sit amet',
    //         title: 'Lorem Ipsum',
    //     }
    // ];

    constructor() {
        this.intializeRoutes();
    }

    private intializeRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.get(`${this.path}/:id`, this.getPostById);
        this.router.put(`${this.path}/:id`, this.modifyPost);
        this.router.delete(`${this.path}/:id`, this.deletePost);
        this.router.post(this.path, this.createPost);
        this.router.patch(`${this.path}/:id`, validationMiddleware(CreatePostDto, true), this.modifyPost);
        this.router.post(this.path, validationMiddleware(CreatePostDto), this.createPost);
    }

    // getAllPosts = (request: express.Request, response: express.Response) => {
    //     response.send(this.posts);
    // }

    // createAPost = (request: express.Request, response: express.Response) => {
    //     const post: Post = request.body;
    //     this.posts.push(post);
    //     response.send(post);
    // }

    private getAllPosts = (request: express.Request, response: express.Response) => {
        this.post.find()
            .then((posts) => {
                response.send(posts);
            });
    };

    private getPostById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        this.post.findById(id)
            .then((post) => {
                if (post) {
                    response.send(post);
                } else {
                    next(new PostNotFoundException(id));
                }
            });
    };

    private modifyPost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const postData: Post = request.body;
        this.post.findByIdAndUpdate(id, postData, { new: true })
            .then((post) => {
                if(post) {
                    response.send(post);
                } else {
                    next(new PostNotFoundException(id));
                }
            });
    };

    private createPost = (request: express.Request, response: express.Response) => {
        const postData: Post = request.body;
        const createdPost = new this.post(postData);
        createdPost.save()
            .then((savedPost) => {
                response.send(savedPost);
            });
    };

    private deletePost = (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        this.post.findByIdAndDelete(id)
            .then((successResponse) => {
                if (successResponse) {
                    response.send(200);
                } else {
                    next(new PostNotFoundException(id));
                }
            });
    }

}

export default PostsController;