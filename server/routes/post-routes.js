import Express from "express";
import { getFeedPosts, getUserPosts, likePost} from "../controller/post-controller.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const router = Express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);


/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
