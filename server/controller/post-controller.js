import Post from "../models/Post-model.js";
import User from "../models/User-model.js";
import { logger } from "../logger.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* Get User Posts*/
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    logger.info(`[Delete Post] :: postId :: ${postId} :: userId :: ${userId}`);
    const post = await Post.findById(postId);
    logger.info(`[Delete Post] :: post :: ${post}`);
    if (!post) {
      return res.status(403).json({ message: "Invalid Post Id" });
    }
    if (post.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this post" });
    }
    if (post) {
      // Delete the associated image
      const imagePath = path.join("public/assets", post.picturePath);
      logger.info(`[Delete Post] :: imagePath :: ${imagePath}`);
      fs.unlinkSync(imagePath);

      //Delte the Post
      const DeletedPost = await Post.findByIdAndDelete(postId);
      logger.info(`[Delete Post] :: deletedPost :: ${DeletedPost}`);
      res.status(200).json({ message: "Post Delete Successfully" });
    } else {
      return res.status(404).json({ error: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
