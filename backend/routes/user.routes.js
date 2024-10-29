import express from 'express';
import { createAccount, login } from '../controllers/user.controller.js'

const router = express.Router();

router.post('/create', createAccount);           // Create a user
router.get('/login', login);        // Log a user in

export default router;
