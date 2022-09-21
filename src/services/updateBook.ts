import { Book } from "../entities/Book";
import { SearchArray } from "../utils/searchArray";
import fs from "fs";
const biblioteca: Array<Book> = require("../../mock/livros.json");

interface BookToUpdate extends Book {
  newAuthor?: string;
  newBookName?: string;
}

class UpdateBookService {
  async execute(bookToUpdate: BookToUpdate): Promise<Book> {
    const { author, bookName, newAuthor, newBookName } = bookToUpdate;

    if (!author || !bookName)
      throw new Error("Please provide author and bookName to update");

    if (!newAuthor && !newBookName)
      throw new Error("Please provide a newAuthor or newBookName");

    const index = new SearchArray().Search(author, bookName);
    if (index == -1) {
      throw new Error("The book was not exists in the database");
    } else {
      if (!!newAuthor && newBookName) {
        biblioteca[index] = {
          author: newAuthor,
          bookName: newBookName,
        };
      }
      if (!!newAuthor) {
        biblioteca[index].author = newAuthor;
      }
      if (!!newBookName) {
        biblioteca[index].bookName = newBookName;
      }

      const payload = JSON.stringify(biblioteca);
      fs.writeFile("mock/livros.json", payload, (err) => {
        if (err) throw err;
      });
      return bookToUpdate;
    }
  }
}

export { UpdateBookService };
