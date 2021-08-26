import app from "./app";

import "./database";
require("dotenv").config();

app.listen(process.env.PORT || 3000, () => {
  console.log(`start server at ${process.env.HOST}:${process.env.PORT}/v2`);
});
