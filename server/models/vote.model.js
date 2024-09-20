import { DataTypes } from "sequelize";
import { getSequelize } from "./../utils/db.js";

export const VoteSchema = getSequelize().define("votes", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  candidateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
