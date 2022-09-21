import { Book } from "../entities/Book";
import { BookToUpdate } from "../types/types";
import fs from "fs";
const biblioteca: Array<Book> = require("../../mock/livros.json");

type CreatedBook = {
  createdBook: Book;
};
type UpdatedBooks = {
  updatedBook: Book;
};
type DeletedBook = {
  deletedBook: Book;
};

class BooksRepository {
  static getAll(): Book[] {
    try {
      return biblioteca;
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(`Something went wrong, error message: ${errorMessage}`);
    }
  }
  static create(bookToCreate: Book): CreatedBook {
    try {
      const { author, bookName } = bookToCreate;
      biblioteca.push({
        author: author,
        bookName: bookName,
      });
      const payload = JSON.stringify(biblioteca);
      fs.writeFile("mock/livros.json", payload, (err) => {
        if (err) throw err;
      });
      return { createdBook: bookToCreate };
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(`Something went wrong, error message: ${errorMessage}`);
    }
  }
  static update(bookToUpdate: BookToUpdate, bookIndex: number): UpdatedBooks {
    try {
      const { newAuthor, newBookName } = bookToUpdate;
      if (!!newAuthor && newBookName) {
        biblioteca[bookIndex] = {
          author: newAuthor,
          bookName: newBookName,
        };
      }
      if (!!newAuthor) {
        biblioteca[bookIndex].author = newAuthor;
      }
      if (!!newBookName) {
        biblioteca[bookIndex].bookName = newBookName;
      }

      const payload = JSON.stringify(biblioteca);
      fs.writeFile("mock/livros.json", payload, (err) => {
        if (err) throw err;
      });

      return { updatedBook: bookToUpdate };
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(`Something went wrong, error message: ${errorMessage}`);
    }
  }
  static delete(bookToDelete: Book, bookIndex: number): DeletedBook {
    try {
      biblioteca.splice(bookIndex, 1);
      const payload = JSON.stringify(biblioteca);
      fs.writeFile("mock/livros.json", payload, (err) => {
        if (err) throw err;
      });
      return { deletedBook: bookToDelete };
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(`Something went wrong, error message: ${errorMessage}`);
    }
  }
}

export { BooksRepository };
