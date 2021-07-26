import express from "express";
import cors from "cors";
import router from "./routes";
import "./database";
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/v2', router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`start server at ${process.env.HOST}:${process.env.PORT}`);
});


//TO-DO
/*
  Message Erros
*/