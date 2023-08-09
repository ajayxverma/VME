import express from "express";
import {
  getUsrs,
  getUsersFriends,
  addRemoveFriends,
} from "../controller/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/:id", verifyToken, getUsersFriends);

/* Add or Remove Frineds Router */
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

export default router;
