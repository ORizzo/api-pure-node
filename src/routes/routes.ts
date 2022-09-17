import http from "http";
import fs from "fs";
import SearchArray from "../modules/searchArray";
import { defaultHeaders } from "../modules/defaultHeaders";
import { GetBookController } from "../controllers/getBook";
import { Livros } from "../entities/Livros";
import { Books } from '../utils/books'
interface UpdateLivros extends Livros {
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
        requestbody?: Livros | UpdateLivros
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
        try {
          JSON.stringify(requestbody) === "{}"
            ? (requestbody = undefined)
            : requestbody;
          if (!requestbody) throw new Error("The request body is empty");

          const { author, bookName } = requestbody;
          const index = new SearchArray().Search(author, bookName);
          if (index == -1) {
            biblioteca.push({
              author: author,
              bookName: bookName,
            });
            const payload = JSON.stringify(biblioteca);
            fs.writeFile("mock/livros.json", payload, (err) => {
              if (err) throw err;
            });
            response.writeHead(
              200,
              "The book has been created in the database",
              defaultHeaders
            );

            response.write(payload);
            response.end();
          } else {
            const payload = JSON.stringify(requestbody);
            response.writeHead(409, "The book already exists", defaultHeaders);
            response.write(payload);
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
      },

      put: (request, response, requestbody) => {
        try {
          JSON.stringify(requestbody) === "{}"
            ? (requestbody = undefined)
            : requestbody;
          if (!requestbody) throw new Error("The request body is empty");

          const { author, bookName, newAuthor, newBookName }: UpdateLivros =
            requestbody;
          if (!author || !bookName)
            throw new Error("Please provide author and bookName to update");

          if (!newAuthor && !newBookName)
            throw new Error("Please provide a newAuthor or newBookName");

          const index = new SearchArray().Search(author, bookName);
          if (index == -1) {
            response.writeHead(
              404,
              "The book was not exists in the database",
              defaultHeaders
            );
            response.write(
              "Please insert the book in the database before trying again."
            );
            response.end();
          } else {
            if (!!newAuthor && newBookName) {
              biblioteca[index] = {
                author: newAuthor,
                bookName: newBookName,
              };
            }
            if (!!newAuthor) {
              biblioteca[index].author = newAuthor;
            }
            if (!!newBookName) {
              biblioteca[index].bookName = newBookName;
            }

            const payload = JSON.stringify(biblioteca);
            fs.writeFile("mock/livros.json", payload, (err) => {
              if (err) throw err;
            });
            response.writeHead(
              200,
              "The book is already updated",
              defaultHeaders
            );
            response.write(payload);
            response.end();
          }
        } catch (error) {
          const errorMessage = (error as Error).message; // parei aqui, algum lugar era rpra reveber string e ta recebdmoa rray
          response.writeHead(400, errorMessage);
          response.write(
            "You need to fill the fields of author and bookName into request body."
          );
          response.end();
        }
      },
      delete: (request, response, requestbody) => {
        try {
          JSON.stringify(requestbody) === "{}"
            ? (requestbody = undefined)
            : requestbody;
          if (!requestbody) throw new Error("The request body is empty");

          const { author, bookName } = requestbody;
          const index = new SearchArray().Search(author, bookName);
          if (index == -1) {
            response.writeHead(
              404,
              "The book was not exists in the database",
              defaultHeaders
            );
            response.end();
          } else {
            biblioteca.splice(index, 1);
            const payload = JSON.stringify(biblioteca);
            fs.writeFile("mock/livros.json", payload, (err) => {
              if (err) throw err;
            });
            response.writeHead(
              200,
              "The book is already deleted",
              defaultHeaders
            );
            response.write(payload);
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

export default routes;
