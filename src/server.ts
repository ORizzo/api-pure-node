import http from "http";
import routes from "./routes/routes";
import url from "url";
http
  .createServer(async function (request, response) {
    try {
      //@ts-ignore
      const parsedUrl = url.parse(request.url, true);
      const Path = parsedUrl.pathname;
      if (!Path) throw new Error("Something went wrong");
      const trimmedPath: string = Path.replace(/^\/+|\/+$/g, ""); // o path sem as barras no final e no inicio.
      // const queryStringObject = parsedUrl.query; // o query object com as informações que chegam pela req, vem pela url ou pelo corpo da req
      if (!request.method) throw new Error("The request have not method");

      var method = request.method.toLowerCase();
      if (method == "get") {
        var chosenHandler =
          typeof routes[trimmedPath] !== "undefined"
            ? routes[trimmedPath].methods[method](
                request,
                response
              )
            : routes.notFound.methods[method](request, response);

        chosenHandler;
      } else {
        for await (const data of request) {
          const requestbody = JSON.parse(data);
          var chosenHandler =
            typeof routes[trimmedPath] !== "undefined"
              ? routes[trimmedPath].methods[method](
                  request,
                  response,
                  requestbody
                )
              : routes.notFound.methods[method](request, response, requestbody);

          chosenHandler;
        }
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      response.writeHead(500, errorMessage);
      response.write("Internal Error");
      response.end("Occourred an error during the request was processing.");
    }
  })
  .listen(8080);
