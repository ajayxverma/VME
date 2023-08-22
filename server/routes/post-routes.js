import Express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePost,
} from "../controller/post-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const router = Express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE Post*/
router.patch("/:id/like", verifyToken, likePost);

/* Delete Post*/
router.delete("/:userId/:postId", verifyToken, deletePost);

export default router;
