import https from "node:https";
import http from "node:http";
import { routes } from "./routes/routes";
import url from "node:url";
import { config } from "./utils/config";

http
  .createServer(async function (request, response) {
    try {
      if (!request.url) throw new Error("Request without url");
      const parsedUrl = url.parse(request.url, true);
      const Path = parsedUrl.pathname;
      if (!Path) throw new Error("Request without path");
      const trimmedPath: string = Path.replace(/^\/+|\/+$/g, ""); // o path sem as barras no final e no inicio.
      // const queryStringObject = parsedUrl.query; // o query object com as informações que chegam pela req, vem pela url ou pelo corpo da req
      if (!request.method) throw new Error("The request have not method");

      const method = request.method.toLowerCase();
      if (method == "get") {
        const chosenHandler =
          typeof routes[trimmedPath] !== "undefined"
            ? routes[trimmedPath].methods[method](request, response)
            : routes.notFound.methods[method](request, response);

        chosenHandler;
      } else {
        for await (const data of request) {
          const requestbody = JSON.parse(data);
          const chosenHandler =
            typeof routes[trimmedPath] !== "undefined"
              ? routes[trimmedPath].methods[method](
                  request,
                  response,
                  requestbody
                )
              : routes.notFound.methods["default"](
                  request,
                  response,
                  requestbody
                );

          chosenHandler;
        }
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      response.writeHead(400, errorMessage);
      response.write("Internal Error");
      response.end("Occourred an error during the request was processing.");
    }
  })
  .listen(process.env.PORT || 8080);

/**
 * https
  .createServer(config.https, async function (request, response) {
    try {
      if (!request.url) throw new Error("Request without url");
      const parsedUrl = url.parse(request.url, true);
      const Path = parsedUrl.pathname;
      if (!Path) throw new Error("Request without path");
      const trimmedPath: string = Path.replace(/^\/+|\/+$/g, ""); // o path sem as barras no final e no inicio.
      // const queryStringObject = parsedUrl.query; // o query object com as informações que chegam pela req, vem pela url ou pelo corpo da req
      if (!request.method) throw new Error("The request have not method");

      const method = request.method.toLowerCase();
      if (method == "get") {
        const chosenHandler =
          typeof routes[trimmedPath] !== "undefined"
            ? routes[trimmedPath].methods[method](request, response)
            : routes.notFound.methods[method](request, response);

        chosenHandler;
      } else {
        for await (const data of request) {
          const requestbody = JSON.parse(data);
          const chosenHandler =
            typeof routes[trimmedPath] !== "undefined"
              ? routes[trimmedPath].methods[method](
                  request,
                  response,
                  requestbody
                )
              : routes.notFound.methods["default"](
                  request,
                  response,
                  requestbody
                );

          chosenHandler;
        }
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      response.writeHead(400, errorMessage);
      response.write("Internal Error");
      response.end("Occourred an error during the request was processing.");
    }
  })
  .listen(8079);
 */
