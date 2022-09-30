"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchArray = void 0;
var biblioteca = require("../../mock/livros.json");
var SearchArray = /** @class */ (function () {
    function SearchArray() {
    }
    SearchArray.prototype.Search = function (author, bookName) {
        try {
            if (!!author)
                return this.searchByAuthor(author);
            if (!!bookName)
                return this.searchByBookName(bookName);
            throw new Error("Please fill at less one of the arguments");
        }
        catch (error) {
            var errorMessage = error.message;
            throw new Error(errorMessage);
        }
    };
    SearchArray.prototype.searchByAuthor = function (author) {
        for (var i = 0; i < biblioteca.length; i++) {
            if (biblioteca[i].author === author) {
                return i;
            }
        }
        return -1;
    };
    SearchArray.prototype.searchByBookName = function (bookName) {
        for (var i = 0; i < biblioteca.length; i++) {
            if (biblioteca[i].bookName === bookName) {
                return i;
            }
        }
        return -1;
    };
    return SearchArray;
}());
exports.SearchArray = SearchArray;
