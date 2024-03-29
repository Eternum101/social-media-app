import express from "express";
import { getFeedPosts, getUserPosts, likePost, commentPost } from "../controllers/posts.js"
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);
router.post("/:id/comments", verifyToken, commentPost);

export default router;