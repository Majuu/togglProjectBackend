import * as express from 'express';
import * as bodyParser from 'body-parser';








// BODY-PARSER via Postman
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
