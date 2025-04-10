// src/routes/userRoutes.ts
import { Router } from "express";
import { userController } from "../controllers/userController";

const router = Router();

router.post("/register", userController.create);
router.get("/users/:userId/workshops", userController.getUserWorkshops);
router.get("/users", userController.getAllUsersWithWorkshopCount); // 🔹 Nova rota
router.get("/users/workshops-by-email", userController.getUserWorkshopsByEmail);

export default router;
