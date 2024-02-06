import express from "express";
import {addUser,displayUser} from '../controllers/controller.js'

const router = express.Router();

router.post('/addUser',addUser)
router.get('/displayUser',displayUser)

export default router;