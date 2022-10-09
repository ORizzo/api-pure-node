import { ServerResponse } from "http";
import { defaultHeaders } from "../utils/defaultHeaders";
import { PostBookService } from "../services/postBook";

type RequestBody = {
  author: string;
  bookName: string;
};
class PostBookController {
  static async handle(response: ServerResponse, bookToCreate?: RequestBody) {
    try {
      JSON.stringify(bookToCreate) === "{}"
        ? (bookToCreate = undefined)
        : bookToCreate;
      if (!bookToCreate) throw new Error("The request body is empty");
      try {
        const service = new PostBookService();
        const result = await service.execute(bookToCreate);
        const payload = JSON.stringify(result);
        response.writeHead(
          201,
          "The book was created in the database",
          defaultHeaders
        );
        response.write(payload);
        response.end();
      } catch (error) {
        const errorMessage = (error as Error).message;
        console.log(errorMessage);
        const payload = JSON.stringify(bookToCreate);
        response.writeHead(409, errorMessage, defaultHeaders);
        response.write(payload);
        response.end();
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      response.writeHead(400, errorMessage, defaultHeaders);
      response.write(
        "You need to fill the fields of author and bookName into request body."
      );
      response.end();
    }
  }
}

export { PostBookController };
