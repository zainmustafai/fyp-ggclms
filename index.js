import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from './DatabaseConfig/databaseConfig.js';
const app = express();
const PORT = process.env.PORT || 8081 || 8082;
//ROUTERS
import userRouter from './routes/user.routes.js';
import adminRouter from './routes/admin.routes.js';
import teacherRouter from './routes/teacher.routes.js';
// Configuration of environment variables.

dotenv.config();
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
app.use('/api/', userRouter);
app.use('/api/admin',adminRouter);
app.use('/api/teacher',teacherRouter);

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