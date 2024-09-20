import { CountySchema } from "../models/county.model.js";
import { getSequelize } from "../utils/db.js";

export const COUNTIES = [
  { abr: "ab", nume: "Alba" },
  { abr: "ar", nume: "Arad" },
  { abr: "ag", nume: "Argeș" },
  { abr: "bc", nume: "Bacău" },
  { abr: "bh", nume: "Bihor" },
  { abr: "bn", nume: "Bistrița-Năsăud" },
  { abr: "bt", nume: "Botoșani" },
  { abr: "br", nume: "Brăila" },
  { abr: "bv", nume: "Brașov" },
  { abr: "b", nume: "București" },
  { abr: "bz", nume: "Buzău" },
  { abr: "cl", nume: "Călărași" },
  { abr: "cs", nume: "Caraș-Severin" },
  { abr: "cj", nume: "Cluj" },
  { abr: "ct", nume: "Constanța" },
  { abr: "cv", nume: "Covasna" },
  { abr: "db", nume: "Dâmbovița" },
  { abr: "dj", nume: "Dolj" },
  { abr: "gl", nume: "Galați" },
  { abr: "gr", nume: "Giurgiu" },
  { abr: "gj", nume: "Gorj" },
  { abr: "hg", nume: "Harghita" },
  { abr: "hr", nume: "Harghita" },
  { abr: "hd", nume: "Hunedoara" },
  { abr: "il", nume: "Ialomița" },
  { abr: "is", nume: "Iași" },
  { abr: "if", nume: "Ilfov" },
  { abr: "mm", nume: "Maramureș" },
  { abr: "mh", nume: "Mehedinți" },
  { abr: "ms", nume: "Mureș" },
  { abr: "nt", nume: "Neamț" },
  { abr: "ot", nume: "Olt" },
  { abr: "ph", nume: "Prahova" },
  { abr: "sj", nume: "Sălaj" },
  { abr: "sm", nume: "Satu Mare" },
  { abr: "sb", nume: "Sibiu" },
  { abr: "sv", nume: "Suceava" },
  { abr: "tr", nume: "Teleorman" },
  { abr: "tm", nume: "Timiș" },
  { abr: "tl", nume: "Tulcea" },
  { abr: "vl", nume: "Vâlcea" },
  { abr: "vs", nume: "Vaslui" },
  { abr: "vn", nume: "Vrancea" },
];

export class Counties {
  countySchema = null;
  sequelize = null;

  constructor() {
    this.sequelize = getSequelize();
    this.countySchema = CountySchema;
  }

  static async createCountyTable() {
    try {
      await getSequelize().sync();
      COUNTIES.forEach(function ({ nume }) {
        CountySchema.findOrCreate({where: {name: nume }})
      });
    } catch (e) {
      console.log(e);
      console.log("error while creating counties table");
    }
  }

  async fetchByName(name) {
    const result = await this.countySchema.findOne({ where: { name } });
    return result;
  }
}
