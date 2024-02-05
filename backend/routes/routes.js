import express from "express";
import path from "path";
import multer from "multer";
import {check,add} from '../controllers/controller.js'

const router = express.Router();

router.get('/check',check)
router.post('/add',add)

export default router;