import 'dotenv/config';
import App from './app';
import PostsController from './posts/posts.controller';
// import {cleanEnv, port, str} from "envalid";
import validateEnv from './utils/validateEnv';
import AuthenticationController from "./authentication/authentication.controller";

// validateEnv();


// function validateEnv() {
//     cleanEnv(process.env, {
//         MONGO_PASSWORD: str(),
//         MONGO_PATH: str(),
//         MONGO_USER: str(),
//         PORT: port(),
//     });
// }
validateEnv();


const app = new App(
    [
        new PostsController(),
        new AuthenticationController()
    ],
);

app.listen();




// import * as mongoose from 'mongoose';
// import 'dotenv/config';
//
// const {
//     MONGO_USER,
//     MONGO_PASSWORD,
//     MONGO_PATH,
// } = process.env;
//
// mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
//













































// WORKING CONTROLLERS
// import App from './app';
// import PostsController from './posts/posts.controller';
// const app = new App(
//     [
//         new PostsController(),
//     ],
//     5000,
// );

// WORKING REQUEST
// app.get('/', (request, response) => {
//     response.send({
//         hostname: request.hostname,
//         path: request.path,
//         method: request.method,
//     });
// });

//WORKING ROUTING
// const app = express();
// const router = express.Router();
// router.get('/', (request, response) => {
//     response.send('Hello world!');
// });
// router.get('/hello', (request, response) => {
//     response.send('Hello world!');
// });
// app.use('/api', router);
// // app.use('/', router);
// app.listen(5000);

// WORKING BODY-PARSER via Postman
// import * as bodyParser from 'body-parser';
// const app = express();
//
// app.use(bodyParser.json());
//
// app.post('/', (request, response) => {
//   response.send(request.body);
// });
//
// app.listen(5000);

// WORKING FIRST HELLO WORLD
//
// function loggerMiddleware(request: express.Request, response: express.Response, next) {
//   console.log(`${request.method} ${request.path}`);
//   next();
// }
// const app = express();
//
// app.use(loggerMiddleware);
// app.use(bodyParser.json());
//
// app.get('/', (request, response) => {
//   response.send('Hello world!');
// });
//
// app.post('/', (request, response) => {
//   response.send(request.body);
// });
// app.listen(5000);
