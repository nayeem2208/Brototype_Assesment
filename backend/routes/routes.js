import express from "express";
import {addUser,displayUser,deleteUser} from '../controllers/controller.js'

const router = express.Router();

router.post('/addUser',addUser)
router.get('/displayUser',displayUser)
router.delete('/deleteUser',deleteUser)

export default router;