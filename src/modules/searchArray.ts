import { Livros } from "../entities/Livros";
const biblioteca: Array<Livros> = require("../../mock/livros.json");

class SearchArray {
  constructor() {}
  Search(author?: string, bookName?: string): number {
    try {
      if (!!author) return this.searchByAuthor(author);
      if (!!bookName) return this.searchByBookName(bookName);
      throw new Error("Please fill at less one of the arguments");
    } catch (error) {
      const errorMessage = (error as Error).message;
      throw new Error(errorMessage);
    }
  }
  private searchByAuthor(author: string) {
    for (let i = 0; i < biblioteca.length; i++) {
      if (biblioteca[i].author === author) {
        return i;
      }
    }
    return -1;
  }
  private searchByBookName(bookName: string) {
    for (let i = 0; i < biblioteca.length; i++) {
      if (biblioteca[i].bookName === bookName) {
        return i;
      }
    }
    return -1;
  }
}
export default SearchArray;
