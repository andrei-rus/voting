import express from "express";
import { getCandidates, voteCandidate } from "../controllers/candidates.js";

export const router = express.Router();

router.get("/", getCandidates);

router.post("/vote", voteCandidate);
