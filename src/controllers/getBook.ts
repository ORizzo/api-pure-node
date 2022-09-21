import { ServerResponse } from "http";
import { defaultHeaders } from "../utils/defaultHeaders";
import { GetBookService } from "../services/getBook";
class GetBookController {
  static async handle(response: ServerResponse) {
    const service = new GetBookService();

    const result = await service.execute();

    const payload = JSON.stringify(result);
    response.writeHead(200, defaultHeaders);
    response.end(payload);
  }
}

export { GetBookController };
