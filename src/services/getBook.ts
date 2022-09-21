import { Book } from "../entities/Book";
import { BooksRepository } from "../repository/booksRepository";

class GetBookService {
  async execute(): Promise<Book[]> {
    const biblioteca = BooksRepository.getAll();
    return biblioteca;
  }
}

export { GetBookService };
