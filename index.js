import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./DatabaseConfig/databaseConfig.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import courseRouter from "./routes/course.routes.js";
import cloudinary from "cloudinary";

// Configuration of environment variables.
dotenv.config();
// CLOUDINARY CONFIGURATION

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

cloudinary.v2.config({
  cloud_name: 'dqceqzjjv',
  api_key: '168676738987823',
  api_secret: 'wngWUjqE5tMIGdnuGBkRO5ss3Rk',
  secure: true,
});

const app = express();
const PORT = process.env.SERVER_PORT || 8081;
//Middleware
app.use(express.json());
app.use(
  bodyParser.json({
    limit: "50mb",
  })
);
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);
app.use(cors());
// Enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// ROUTES
app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/courses", courseRouter);

//definition of function to start server
const startServer = (_port, _app) => {
  connectToDatabase();
  try {
    app.listen(_port, () => {
      console.log(
        `Server listening on port ${_port} http://localhost:${_port}`
      );
    });
  } catch (err) {
    console.log("Error starting the server.");
  }
};
startServer(PORT, app);
