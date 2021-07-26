import { Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import { CreateVisitantController } from "./controller/CreateVisitantController";

const router = Router();

const createVisitantController = new CreateVisitantController();

router.post(
  "/visitant",
  upload.single("photo"),
  createVisitantController.handle
);

export default router;
