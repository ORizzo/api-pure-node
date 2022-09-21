import { Book } from "../entities/Book";
import { SearchArray } from "../utils/searchArray";
import { BooksRepository } from '../repository/booksRepository'
class DeleteBookService {
  async execute(bookToDelete: Book): Promise<Book | Error> {
    const { author, bookName } = bookToDelete;
    const index = new SearchArray().Search(author, bookName);
    if (index == -1) {
      throw new Error("The book was not exists in the database");
    } else {
      const { deletedBook } = BooksRepository.delete(bookToDelete, index)
      return deletedBook;
    }
  }
}

export { DeleteBookService };
