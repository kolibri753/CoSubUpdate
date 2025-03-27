import express from "express";
import {
  signIn,
  logout,
  signUp,
  getAuthenticatedUser,
  getAllUsers,
} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/me", protectRoute, getAuthenticatedUser);
router.get("/users", protectRoute, getAllUsers);
router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.post("/logout", logout);

export default router;
