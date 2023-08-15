import express from "express";
import {
  getUsersFriends,
  addRemoveFriends,
  getUser,
} from "../controller/users-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const router = express.Router();

/* READ */

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUsersFriends);

/* Add or Remove Frineds Router */
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

export default router;
