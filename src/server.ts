import express from "express";
import cors from "cors";
import router from "./routes";
import formData from "express-form-data";
import os from "os";
require("dotenv").config();
import "./database";

// const options = {
//   uploadDir: os.tmpdir(),
//   autoClean: true,
// };

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// parse data with connect-multiparty.
// app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream
app.use(formData.stream());
// union the body and the files
app.use(formData.union());
app.use("/v2", router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`start server at`);
});
