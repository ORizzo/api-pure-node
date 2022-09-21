import { Book } from "../entities/Book";

interface BookToUpdate extends Book {
  newAuthor?: string;
  newBookName?: string;
}

export { BookToUpdate };
