import { Book } from "../entities/Book";
import { SearchArray } from "../utils/searchArray";
import { BooksRepository } from "../repository/booksRepository";

class PostBookService {
  async execute(bookToCreate: Book): Promise<Book | Error> {
    const { author, bookName } = bookToCreate;
    const index = new SearchArray().Search(author, bookName);
    if (index == -1) {
      const { createdBook } = BooksRepository.create(bookToCreate);
      return createdBook;
    } else {
      throw new Error("The book already exists");
    }
  }
}

export { PostBookService };
