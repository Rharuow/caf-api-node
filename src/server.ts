import app from "./app";

import "./database";
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

app.listen(process.env.PORT || 3000, () => {
  console.log(process.env.NODE_ENV);
  console.log(`start server at ${process.env.HOST}:${process.env.PORT}`);
});
