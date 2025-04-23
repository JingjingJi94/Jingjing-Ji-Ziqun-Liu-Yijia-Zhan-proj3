import express from "express";
import getAllGamesByUser from "../controllers/allGamesController.js";
import { createNewGame, getGameById, attack} from "../controllers/singleGameController.js";

const router = express.Router();

router.get("/api/games", getAllGamesByUser);
router.post("/api/games/create", createNewGame);
router.get("/api/game/:gameId", getGameById);

router.get("/game/:gameId/attack", attack);
export default router;
