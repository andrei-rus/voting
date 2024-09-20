import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { router as loginRoutes } from "./routes/login.js";
import { router as registerRoutes } from "./routes/register.js";
import { router as candidatesRoutes } from "./routes/candidates.js";
import { Users } from "./services/Users.js";
import { connectDB } from "./utils/db.js";
import { Counties } from "./services/Counties.js";
import { Candidates } from "./services/Candidates.js";
import { Votes } from "./services/Votes.js";
import session from "express-session";

const app = express();

app.use(
  session({
    secret: "secret",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/candidates", candidatesRoutes);

async function startServer() {
  await connectDB();
  Users.createUserTable();
  Counties.createCountyTable();
  Candidates.createCandidateTable();
  Votes.createVoteTable();
  app.listen(3000);
}

startServer();
