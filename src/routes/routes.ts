import http from "http";
import {
  GetBookController,
  PostBookController,
  UpdateBookController,
  DeleteBookController,
  NotFoundController,
} from "../controllers/controllers";
import { Book } from "../entities/Book";
import { BookToUpdate } from "../types/types";
type routes = {
  [key: string]: {
    methods: {
      [key: string]: (
        request: http.IncomingMessage,
        response: http.ServerResponse,
        requestbody?: Book | BookToUpdate
      ) => void;
    };
  };
};
const routes: routes = {
  livros: {
    methods: {
      get: (_, response) => {
        GetBookController.handle(response);
      },
      post: (_, response, requestbody) => {
        PostBookController.handle(response, requestbody);
      },
      put: (_, response, requestbody) => {
        UpdateBookController.handle(response, requestbody);
      },
      delete: (_, response, requestbody) => {
        DeleteBookController.handle(response, requestbody);
      },
    },
  },
  notFound: {
    methods: {
      default: (_, response) => {
        NotFoundController.handle(response);
      },
    },
  },
};

export { routes };
