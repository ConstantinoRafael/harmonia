import { Router } from "express";
import { registrationController } from "../controllers/registrationController";

const router = Router();

// Rota para criar uma nova inscrição
router.post("/", registrationController.create);

// Rota para buscar inscrições de um usuário
router.get("/:userId", registrationController.getByUserId);

export default router;
