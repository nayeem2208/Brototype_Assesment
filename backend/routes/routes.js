import express from "express";
import {addUser,displayUser,deleteUser,updateUser} from '../controllers/controller.js'

const router = express.Router();

router.post('/addUser',addUser)
router.get('/displayUser',displayUser)
router.delete('/deleteUser',deleteUser)
router.put('/updateUser/:id',updateUser)

export default router;