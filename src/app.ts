import express, {json, Request, Response} from "express";
import dotenv from "dotenv";

// HANDLING UNCAUGHT EXCEPTIONS
process.on("uncaughtException", (e) => {
    console.log(e)
});

// ENVIRONMENT VARIABLES
dotenv.config();

const app = express();


app.use(express.json());


app.use(express.urlencoded({extended: true}));


export default app;