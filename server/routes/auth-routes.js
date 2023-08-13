import express from "express";
import { login, register } from "../controller/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", verifyToken, login);
//router.post("/register", register);
export default router;
