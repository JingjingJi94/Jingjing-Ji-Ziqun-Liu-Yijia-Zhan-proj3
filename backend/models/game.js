import mongoose from "mongoose";

const shipSchema = new mongoose.Schema({
  size: Number, // e.g., 3
  positions: [{ row: Number, col: Number }], // coordinates on gameboard
  isSunk: Boolean,
});

const boardSchema = new mongoose.Schema({
  ships: [shipSchema],
  hits: [{ row: Number, col: Number }],
  misses: [{ row: Number, col: Number }],
});

const gameSchema = new mongoose.Schema({
  gameId: {
    type: String,
    unique: true,
    required: true,
  },
  player1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  player2: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  player1Board: boardSchema,
  player2Board: boardSchema,

  currentTurn: { type: Number, enum: [1, 2], default: 1 },

  gameStatus: {
    type: String,
    enum: ["Open", "Active", "Completed"],
    default: "Open",
  },

  winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  startTime: { type: Date, default: Date.now },
  EndTime: { type: Date },
});

gameSchema.statics.createGame = async function (player1) {
  const game = new this({
    player1,
    player1Board: generateRandomBoard(),
    status: "Open",
    createdAt: new Date(),
  });
  return await game.save();
};

export default mongoose.model("Game", gameSchema);
