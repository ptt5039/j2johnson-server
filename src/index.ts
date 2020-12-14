import express from 'express';
import bodyParser from 'body-parser';
import { listRouter } from './router/list.router';
import { authRouter } from './router/auth.router';
import { sessionMiddleware } from './middleware/session.middleware';


/**
 * specify the port will run on
 */
const port = 8080;
const app = express();

/**
 * Loggin middleware
 * This callback will be invoked anytime a request is made 
 * regardless of url or http method
 *  */ 
app.use((req, res, next) => {
  console.log(`request made with url: ${req.url} and method ${req.method}`)
  next(); // pass request on to search for the next piece of middleware
});

/**
 * set up body parser to convert json body to object stored on req.body
 */
app.use(bodyParser.json());


/**
 * Session middleware to give us access to req.session for session data
 */
app.use(sessionMiddleware);

/**
 * allow cross origins
 */
app.use((req, resp, next) => {
    console.log(req.get('host'));
    resp.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    resp.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH');
    next();
});

/*******************************************
 * Register Routers
 ******************************************/
app.use(authRouter);
app.use('/list', listRouter);



app.listen(port, () => {
    console.log('app started on port: ' + port)
});