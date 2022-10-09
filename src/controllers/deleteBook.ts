import { ServerResponse } from "http";
import { defaultHeaders } from "../utils/defaultHeaders";
import { DeleteBookService } from "../services/deleteBooks";

type RequestBody = {
  author: string;
  bookName: string;
};
class DeleteBookController {
  static async handle(response: ServerResponse, bookToDelete?: RequestBody) {
    try {
      JSON.stringify(bookToDelete) === "{}"
        ? (bookToDelete = undefined)
        : bookToDelete;
      if (!bookToDelete) throw new Error("The request body is empty");
      try {
        const service = new DeleteBookService();
        const result = await service.execute(bookToDelete);
        const payload = JSON.stringify(result);
        
        response.writeHead(200, "The book is already deleted", defaultHeaders);
        response.write(payload);
        response.end();
      } catch (error) {
        const errorMessage = (error as Error).message;
        response.writeHead(404, errorMessage, defaultHeaders);
        response.write("Change the book for which one exists in the database.");
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

export { DeleteBookController };
