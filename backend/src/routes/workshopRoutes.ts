import { Router } from "express";
import { workshopController } from "../controllers/workshopController";

const router = Router();

router.post("/", workshopController.create);
router.get("/", workshopController.getAll);
router.get("/:id", workshopController.getById);
router.put("/:id", workshopController.update);
router.delete("/:id", workshopController.delete);

export default router;
