"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var controllers_1 = require("../controllers/controllers");
var routes = {
    livros: {
        methods: {
            get: function (_, response) {
                controllers_1.GetBookController.handle(response);
            },
            post: function (_, response, requestbody) {
                controllers_1.PostBookController.handle(response, requestbody);
            },
            put: function (_, response, requestbody) {
                controllers_1.UpdateBookController.handle(response, requestbody);
            },
            delete: function (_, response, requestbody) {
                controllers_1.DeleteBookController.handle(response, requestbody);
            },
        },
    },
    notFound: {
        methods: {
            default: function (_, response) {
                controllers_1.NotFoundController.handle(response);
            },
        },
    },
};
exports.routes = routes;
