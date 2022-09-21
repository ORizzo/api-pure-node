import http from "http";
import {
  GetBookController,
  PostBookController,
  UpdateBookController,
  DeleteBookController,
  NotFoundController,
} from "../controllers/controllers";
import { Book } from "../entities/Book";
import { BookToUpdate } from '../types/types'
interface routes {
  [key: string]: {
    methods: {
      [key: string]: (
        request: http.IncomingMessage,
        response: http.ServerResponse,
        requestbody?: Book | BookToUpdate
      ) => void;
    };
  };
}
const routes: routes = {
  livros: {
    methods: {
      get: (request, response) => {
        GetBookController.handle(response);
      },
      post: (request, response, requestbody) => {
        PostBookController.handle(response, requestbody);
      },

      put: (request, response, requestbody) => {
        UpdateBookController.handle(response, requestbody);
      },
      delete: (request, response, requestbody) => {
        DeleteBookController.handle(response, requestbody);
      },
    },
  },
  notFound: {
    methods: {
      get: (request, response) => {
        NotFoundController.handle(response);
      },
      post: (request, response) => {
        NotFoundController.handle(response);
      },
      put: (request, response) => {
        NotFoundController.handle(response);
      },
      delete: (request, response) => {
        NotFoundController.handle(response);
      },
    },
  },
};

export { routes };
