import { ServerResponse } from "http";

class NotFoundController {
  static async handle(response: ServerResponse) {
    response.setHeader("Content-Type", "");
    response.writeHead(404);
    response.end("A handler for this endpoint ain't available.");
  }
}

export { NotFoundController };
