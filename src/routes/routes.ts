import http from "http";
import {
  GetBookController,
  PostBookController,
  UpdateBookController,
  DeleteBookController,
} from "../controllers/controllers";
import { Book } from "../entities/Book";
import { Books } from "../utils/books";
interface UpdateLivros extends Book {
  newAuthor?: string;
  newBookName?: string;
}
const biblioteca = Books.all();
interface routes {
  [key: string]: {
    methods: {
      [key: string]: (
        request: http.IncomingMessage,
        response: http.ServerResponse,
        requestbody?: Book | UpdateLivros
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
        response.setHeader("Content-Type", "");
        response.writeHead(404);
        response.end("A handler for this endpoint ain't available.");
      },
      post: (request, response) => {
        response.setHeader("Content-Type", "");
        response.writeHead(404);
        response.end("A handler for this endpoint ain't available.");
      },
      put: (request, response) => {
        response.setHeader("Content-Type", "");
        response.writeHead(404);
        response.end("A handler for this endpoint ain't available.");
      },
      delete: (request, response) => {
        response.setHeader("Content-Type", "");
        response.writeHead(404);
        response.end("A handler for this endpoint ain't available.");
      },
    },
  },
};

export { routes };
