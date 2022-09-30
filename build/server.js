"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_https_1 = __importDefault(require("node:https"));
var routes_1 = require("./routes/routes");
var node_url_1 = __importDefault(require("node:url"));
var node_fs_1 = __importDefault(require("node:fs"));
var options = {
    key: node_fs_1.default.readFileSync(__dirname + "/https/key.pem"),
    cert: node_fs_1.default.readFileSync(__dirname + "/https/cert.pem"),
};
node_https_1.default
    .createServer(options, function (request, response) {
    var request_1, request_1_1;
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var parsedUrl, Path, trimmedPath, method, chosenHandler, data, requestbody, chosenHandler, e_1_1, error_1, errorMessage;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 13, , 14]);
                    if (!request.url)
                        throw new Error("Request without url");
                    parsedUrl = node_url_1.default.parse(request.url, true);
                    Path = parsedUrl.pathname;
                    if (!Path)
                        throw new Error("Request without path");
                    trimmedPath = Path.replace(/^\/+|\/+$/g, "");
                    // const queryStringObject = parsedUrl.query; // o query object com as informações que chegam pela req, vem pela url ou pelo corpo da req
                    if (!request.method)
                        throw new Error("The request have not method");
                    method = request.method.toLowerCase();
                    if (!(method == "get")) return [3 /*break*/, 1];
                    chosenHandler = typeof routes_1.routes[trimmedPath] !== "undefined"
                        ? routes_1.routes[trimmedPath].methods[method](request, response)
                        : routes_1.routes.notFound.methods[method](request, response);
                    chosenHandler;
                    return [3 /*break*/, 12];
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    request_1 = __asyncValues(request);
                    _b.label = 2;
                case 2: return [4 /*yield*/, request_1.next()];
                case 3:
                    if (!(request_1_1 = _b.sent(), !request_1_1.done)) return [3 /*break*/, 5];
                    data = request_1_1.value;
                    requestbody = JSON.parse(data);
                    chosenHandler = typeof routes_1.routes[trimmedPath] !== "undefined"
                        ? routes_1.routes[trimmedPath].methods[method](request, response, requestbody)
                        : routes_1.routes.notFound.methods["default"](request, response, requestbody);
                    chosenHandler;
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(request_1_1 && !request_1_1.done && (_a = request_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(request_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [3 /*break*/, 14];
                case 13:
                    error_1 = _b.sent();
                    errorMessage = error_1.message;
                    response.writeHead(400, errorMessage);
                    response.write("Internal Error");
                    response.end("Occourred an error during the request was processing.");
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
})
    .listen(8080);
