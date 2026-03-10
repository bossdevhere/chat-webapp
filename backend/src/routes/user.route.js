import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getRecommendedUsers, getMyFriends } from "../controllers/user.controller.js";
import { sendFriendRequest } from "../controllers/user.controller.js";
import { acceptFriendRequest } from "../controllers/user.controller.js";
import { get } from "mongoose";
import { getFriendRequests, getOutgoingFriendRequests } from "../controllers/user.controller.js";

const router = express.Router();

//apply middleware to all routes in this router
router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendRequests);

export default router;