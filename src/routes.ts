import { Router } from "express";
import multer from "multer";
import { CreateEmployeeController } from "./controller/employee/CreateEmployeeController";
import { CreateSessionController } from "./controller/session/CreateSessionController";
import { ConfirmationSignupController } from "./controller/user/ConfirmationSignupController";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { CreateVisitantController } from "./controller/visitant/CreateVisitantController";
import { redirectAuthUser } from "./middlewares/redirectAuthUser";

const router = Router();

const createVisitantController = new CreateVisitantController();
const createEmployeeCOntroller = new CreateEmployeeController();
const confirmationSignupController = new ConfirmationSignupController();
const visitantCreateSessionController = new CreateSessionController();

router.post(
  "/visitant",
  upload.single("photo"),
  createVisitantController.handle
);

router.post(
  "/employee",
  upload.single("photo"),
  createEmployeeCOntroller.handle
);

router.post("/auth", redirectAuthUser, visitantCreateSessionController.handle);

router.post("/confirmation", confirmationSignupController.handle);

export default router;
