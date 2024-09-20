import { DataTypes } from "sequelize";
import { getSequelize } from "./../utils/db.js";

export const CandidateSchema = getSequelize().define("candidates", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
