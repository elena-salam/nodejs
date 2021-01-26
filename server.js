const mongoose = require('mongoose');
const express = require('express');

const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const userRouter = require("./routers/userRouter.js");
const authRouter = require("./routers/authRouter.js");
// const notesRouter = require("./routers/notesRouter.js");
const PORT =  process.env.PORT;
const URL = process.env.MONGO_URL;


module.exports = class UserServer {
    constructor() {
        this.server = null;
    }
    async start() {
        this.initServer();
        this.initMiddlewares();
        this.initRoutes();
        await this.initDatabase();
        this.startListeningServer();
    }

    initServer() {
        this.server = express();
    }

    initMiddlewares() {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(morgan("dev"));
    }

    initRoutes() {
        this.server.use("/api/users", userRouter);
        this.server.use("/api/auth", authRouter);
    }

    async initDatabase() {
        try{
            await mongoose.connect(URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            });
            console.log("Database connection successful");
        }catch (err) {
            console.log("error: ", err);
            process.exit(1);
        } 
    }
    startListeningServer() {
        this.server.listen(PORT, () => {
            console.log(`Server works on port ${PORT}`)
        });
    }

};

