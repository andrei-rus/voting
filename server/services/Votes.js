import { VoteSchema } from "../models/vote.model.js";
import { getSequelize } from "../utils/db.js";

export class Votes {
  voteSchema = null;
  sequelize = null;

  constructor() {
    this.sequelize = getSequelize();
    this.voteSchema = VoteSchema;
  }

  static async createVoteTable() {
    try {
      await getSequelize().sync();
    } catch (e) {
      console.log("error while creating votes table");
    }
  }

  async addVote(userId, candidateId) {
    await this.voteSchema.create({ userId, candidateId });
  }
}
