import { ServerResponse } from "http";
import { defaultHeaders } from "../utils/defaultHeaders";
import { UpdateBookService } from "../services/updateBook";

type RequestBody = {
  author: string;
  bookName: string;
};
class UpdateBookController {
  static async handle(response: ServerResponse, bookToUpdate?: RequestBody) {
    try {
      JSON.stringify(bookToUpdate) === "{}"
        ? (bookToUpdate = undefined)
        : bookToUpdate;
      if (!bookToUpdate) throw new Error("The request body is empty");
      try {
        const service = new UpdateBookService();
        const result = await service.execute(bookToUpdate);
        const payload = JSON.stringify(result);
        response.writeHead(200, "The book is already updated", defaultHeaders);
        response.write(payload);
        response.end();
      } catch (error) {
        const errorMessage = (error as Error).message;
        response.writeHead(404, errorMessage, defaultHeaders);
        response.write("Fix the request body before trying again.");
        response.end();
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      response.writeHead(400, errorMessage);
      response.write(
        "You need to fill the fields of author and bookName into request body."
      );
      response.end();
    }
  }
}

export { UpdateBookController };
