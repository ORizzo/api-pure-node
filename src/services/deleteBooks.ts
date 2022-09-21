import { Book } from "../entities/Book";
import { SearchArray } from "../utils/searchArray";
import fs from "fs";
const biblioteca: Array<Book> = require("../../mock/livros.json");

class DeleteBookService {
  async execute(bookToDelete: Book): Promise<Book | Error> {
    const { author, bookName } = bookToDelete;
    const index = new SearchArray().Search(author, bookName);
    if (index == -1) {
      throw new Error("The book was not exists in the database");
    } else {
      biblioteca.splice(index, 1);
      const payload = JSON.stringify(biblioteca);
      fs.writeFile("mock/livros.json", payload, (err) => {
        if (err) throw err;
      });
      return bookToDelete;
    }
  }
}

export { DeleteBookService };
