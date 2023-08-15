import Express from "express";
import { getFeedPosts, getUserPosts } from "../controller/post-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const router = Express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

export default router;
