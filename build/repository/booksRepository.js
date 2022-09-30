"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksRepository = void 0;
var fs_1 = __importDefault(require("fs"));
var biblioteca = require("../../mock/livros.json");
var BooksRepository = /** @class */ (function () {
    function BooksRepository() {
    }
    BooksRepository.getAll = function () {
        try {
            return biblioteca;
        }
        catch (error) {
            var errorMessage = error.message;
            throw new Error("Something went wrong, error message: ".concat(errorMessage));
        }
    };
    BooksRepository.create = function (bookToCreate) {
        try {
            var author = bookToCreate.author, bookName = bookToCreate.bookName;
            biblioteca.push({
                author: author,
                bookName: bookName,
            });
            var payload = JSON.stringify(biblioteca);
            fs_1.default.writeFile("mock/livros.json", payload, function (err) {
                if (err)
                    throw err;
            });
            return { createdBook: bookToCreate };
        }
        catch (error) {
            var errorMessage = error.message;
            throw new Error("Something went wrong, error message: ".concat(errorMessage));
        }
    };
    BooksRepository.update = function (bookToUpdate, bookIndex) {
        try {
            var newAuthor = bookToUpdate.newAuthor, newBookName = bookToUpdate.newBookName;
            if (!!newAuthor && newBookName) {
                biblioteca[bookIndex] = {
                    author: newAuthor,
                    bookName: newBookName,
                };
            }
            if (!!newAuthor) {
                biblioteca[bookIndex].author = newAuthor;
            }
            if (!!newBookName) {
                biblioteca[bookIndex].bookName = newBookName;
            }
            var payload = JSON.stringify(biblioteca);
            fs_1.default.writeFile("mock/livros.json", payload, function (err) {
                if (err)
                    throw err;
            });
            return { updatedBook: bookToUpdate };
        }
        catch (error) {
            var errorMessage = error.message;
            throw new Error("Something went wrong, error message: ".concat(errorMessage));
        }
    };
    BooksRepository.delete = function (bookToDelete, bookIndex) {
        try {
            biblioteca.splice(bookIndex, 1);
            var payload = JSON.stringify(biblioteca);
            fs_1.default.writeFile("mock/livros.json", payload, function (err) {
                if (err)
                    throw err;
            });
            return { deletedBook: bookToDelete };
        }
        catch (error) {
            var errorMessage = error.message;
            throw new Error("Something went wrong, error message: ".concat(errorMessage));
        }
    };
    return BooksRepository;
}());
exports.BooksRepository = BooksRepository;
