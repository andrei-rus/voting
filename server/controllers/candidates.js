import { Counties } from "../services/Counties.js";
import { Votes } from "../services/Votes.js";
import { Candidates } from "./../services/Candidates.js";

const candidates = new Candidates();
const counties = new Counties();
const votes = new Votes();

export const getCandidates = async (req, res, next) => {
  const county = await counties.fetchByName(req.query.countyName);
  const fetchedCandidates = await candidates.getByCountyId(county.id);

  res.send(fetchedCandidates);
};

export const voteCandidate = async (req, res, next) => {
  console.log(req.session);
  console.log(req.body);

  // to do
  // await votes.addVote(req.session.userId, req.body.candidateId);

  res.send(true);
};
