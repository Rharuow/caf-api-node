import { Request, Response, Router } from "express";
import multer from "multer";
import { AddCheckinController } from "./controller/Access/AddCheckinController";
import { AddCheckoutController } from "./controller/Access/AddCheckoutController";
import { GetAccessCodeController } from "./controller/Access/GetAccessCodeController";
import { GetAccessesController } from "./controller/Access/GetAccessesController";
import { CreateEmployeeController } from "./controller/employee/CreateEmployeeController";
import { CreateSessionController } from "./controller/session/CreateSessionController";
import { ConfirmationSignupController } from "./controller/user/ConfirmationSignupController";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { CreateVisitantController } from "./controller/visitant/CreateVisitantController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ensureParamsCreateEmployee } from "./middlewares/ensureParamsCreateEmployee";
import { ensureParamsCreateUser } from "./middlewares/ensureParamsCreateUser";
import { ensureParamsCreateVisitant } from "./middlewares/ensureParamsCreateVisitant";
import { ensureParamsSessionCreate } from "./middlewares/ensureParamsSessionCreate";
import { hasCheckin } from "./middlewares/hasCheckin";
import { hasNotCheckin } from "./middlewares/hasNotCheckin";
import { redirectAuthUser } from "./middlewares/redirectAuthUser";

const router = Router();

const createVisitantController = new CreateVisitantController();
const createEmployeeController = new CreateEmployeeController();
const confirmationSignupController = new ConfirmationSignupController();
const visitantCreateSessionController = new CreateSessionController();
const addCheckinController = new AddCheckinController();
const addCheckoutController = new AddCheckoutController();
const getAccessCodeController = new GetAccessCodeController();
const getAccessesController = new GetAccessesController();

router.get("/", (req: Request, res: Response) =>
  res.send("Welcome to version 2 node CAF API")
);

router.post(
  "/visitant",
  ensureParamsCreateUser,
  ensureParamsCreateVisitant,
  upload.single("photo"),
  createVisitantController.handle
);

router.post(
  "/employee",
  ensureParamsCreateUser,
  ensureParamsCreateEmployee,
  upload.single("photo"),
  createEmployeeController.handle
);

router.post(
  "/auth",
  ensureParamsSessionCreate,
  redirectAuthUser,
  visitantCreateSessionController.handle
);

router.post("/checkin", hasNotCheckin, addCheckinController.handle);

router.post("/checkout", hasCheckin, addCheckoutController.handle);

router.post("/confirmation", confirmationSignupController.handle);

router.get("/access/code", ensureAuthenticated, getAccessCodeController.handle);

router.get(
  "/access/historic",
  ensureAuthenticated,
  getAccessesController.handle
);

export default router;
