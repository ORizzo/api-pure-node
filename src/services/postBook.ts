import { Book } from "../entities/Book";
import { SearchArray } from "../utils/searchArray";
import fs from "fs";
const biblioteca: Array<Book> = require("../../mock/livros.json");

class PostBookService {
  async execute(bookToCreat: Book): Promise<Book | Error> {
    const { author, bookName } = bookToCreat;
    const index = new SearchArray().Search(author, bookName);
    if (index == -1) {
      // -1 meaning's "the seach method don't find any book with that name or author"
      biblioteca.push({
        author: author,
        bookName: bookName,
      });
      const payload = JSON.stringify(biblioteca);
      fs.writeFile("mock/livros.json", payload, (err) => {
        if (err) throw err;
      });
      return bookToCreat;
    } else {
      throw new Error("The book already exists");
    }
  }
}

export { PostBookService };
