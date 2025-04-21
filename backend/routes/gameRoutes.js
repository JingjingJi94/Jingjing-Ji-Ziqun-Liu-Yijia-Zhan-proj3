import express from "express";
import getAllGamesByUser from "../controllers/allGamesController.js";
import createNewGame from "../controllers/newGameController.js";
import getGameById from "../controllers/singleGameController.js";

const router = express.Router();

router.get("/", getAllGamesByUser);
router.post("/create", createNewGame); // ✅ POST /api/games/new
router.get("/:gameId", getGameById);

export default router;
