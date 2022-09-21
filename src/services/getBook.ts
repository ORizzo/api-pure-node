import { Book } from "../entities/Book";
import { Books } from "../utils/books";

class GetBookService {
  async execute(): Promise<Book[]> {
    const biblioteca = Books.all();
    return biblioteca;
  }
}

export { GetBookService };
