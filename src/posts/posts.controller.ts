import * as express from 'express';
import Post from './posts.interface';
import postModel from './posts.model';

class PostsController {
    public path = '/posts';
    public router = express.Router();

    private posts: Post[] = [
        {
            author: 'Artur',
            content: 'Dolor sit amet',
            title: 'Lorem Ipsum',
        }
    ];

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.get(this.path, this.getAllPosts);
        this.router.post(this.path, this.createAPost);
    }

    // getAllPosts = (request: express.Request, response: express.Response) => {
    //     response.send(this.posts);
    // }

    // createAPost = (request: express.Request, response: express.Response) => {
    //     const post: Post = request.body;
    //     this.posts.push(post);
    //     response.send(post);
    // }

    createAPost(request: express.Request, response: express.Response) {
        const postData: Post = request.body;
        const createdPost = new postModel(postData);
        createdPost.save()
            .then(savedPost => {
                response.send(savedPost);
            })
    }

    getAllPosts(request: express.Request, response: express.Response) {
        postModel.find()
            .then(posts => {
                response.send(posts);
            })
    }
    getPostById(request: express.Request, response: express.Response) {
        const id = request.params.id;
        postModel.findById(id)
            .then(post => {
                response.send(post);
            })
    }


}

export default PostsController;