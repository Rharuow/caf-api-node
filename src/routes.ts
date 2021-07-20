import { Router } from "express";
import multer from 'multer'
const upload = multer({dest: 'uploads/'})

import { CreateVisitantController } from './controller/CreateVisitantController';


const router = Router()

const createVisitantController = new CreateVisitantController()

router.post('/visitants', upload.single('photo'), createVisitantController.handle)


export default router