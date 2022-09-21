import { Book } from "../entities/Book";
const biblioteca: Array<Book> = require("../../mock/livros.json");

class Books {
  static all(): Book[] {
    return biblioteca;
  }
}

export { Books };
