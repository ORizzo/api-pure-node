import { Livros } from "../entities/Livros";
const biblioteca: Array<Livros> = require("../../mock/livros.json");

class Books {
  static all(): Livros[] {
    return biblioteca;
  }
}

export { Books };
