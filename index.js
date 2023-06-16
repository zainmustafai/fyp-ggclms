import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from './DatabaseConfig/databaseConfig.js';
dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 8081;
//ROUTERS
import userRouter from './routes/user.routes.js';
import adminRouter from './routes/admin.routes.js';
import teacherRouter from './routes/teacher.routes.js';
// Configuration of environment variables.

//Middleware
app.use(express.json());
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true
}));
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// ROUTES
app.use('/api/users', userRouter);
app.use('/api/admin',adminRouter);
app.use('/api/teachers',teacherRouter);

//definition of function to start server
const startServer = (_port, _app) => {
    connectToDatabase();
    try {
        app.listen(_port, () => {
            console.log(`Server listening on port ${_port} http://localhost:${_port}`);
        });
    } catch (err) {
        console.log('Error starting the server.');
    }
};
startServer(PORT, app);