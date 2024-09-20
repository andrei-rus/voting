import { CandidateSchema } from "../models/candidate.model.js";
import { getSequelize } from "../utils/db.js";
import { COUNTIES } from "./Counties.js";

const CANDIDATES = [];

export class Candidates {
  candidateSchema = null;
  sequelize = null;

  constructor() {
    this.sequelize = getSequelize();
    this.candidateSchema = CandidateSchema;
  }

  static async createCandidateTable() {
    try {
      await getSequelize().sync();
      const totalCandidates = await CandidateSchema.count();
      if (totalCandidates === 0) {
        fetch(
          `https://randomuser.me/api/?results=${COUNTIES.length * 2}&nat=US`
        )
          .then((response) => response.json())
          .then((json) => {
            json.results.forEach((user, index) => {
              CandidateSchema.create({
                countyId: ((index + 1) % COUNTIES.length) + 1,
                name: `${user.name.title} ${user.name.first} ${user.name.last}`,
                age: user.dob.age,
                email: user.email,
                address: user.location.city,
                imageURL: user.picture.large,
                gender: user.gender,
              });
            });
          });
      }
    } catch (e) {
      console.log("error while creating candidates table");
    }
  }

  async getByCountyId(countyId) {
    const result = await this.candidateSchema.findAll({ where: { countyId } });
    return result;
  }
}
