import { Book } from "../entities/Book";
import { SearchArray } from "../utils/searchArray";
import { BooksRepository } from "../repository/booksRepository";
import { BookToUpdate } from "../types/types";

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
      const { updatedBook } = BooksRepository.update(bookToUpdate, index);
      return updatedBook;
    }
  }
}

export { UpdateBookService };
