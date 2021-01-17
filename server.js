const mongoose = require('mongoose');
const express = require('express');

const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const contactRouter = require("./routers/contactsRouter.js");
const PORT =  process.env.PORT;


module.exports = class ContactServer {
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
        this.server.use("/api/contacts", contactRouter);
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

