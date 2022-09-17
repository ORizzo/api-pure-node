import { Livros } from "../entities/Livros";

class GetBookService {
  async execute(): Promise<Livros[]> {
    const biblioteca: Array<Livros> = await require("../../mock/livros.json");
    return biblioteca;
  }
}

export { GetBookService };
