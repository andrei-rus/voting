import { DataTypes } from "sequelize";
import { getSequelize } from "./../utils/db.js";

export const CountySchema = getSequelize().define("counties", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
