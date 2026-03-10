import express from 'express';
import { signup , login , logout, onboard} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

//onBoarding route
router.post('/onboarding', protectRoute, onboard);

// check if user is login or not
router.get('/me', protectRoute, (req, res) => {
    res.status(200).json({ success: true, user: req.user });
});



export default router;