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
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentHobbie = void 0;
const hobbies_1 = require("../services/hobbies");
const studentHobbie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hobby = req.params.hobbyName;
        const result = yield (0, hobbies_1.hobbies)(hobby);
        if (result.length === 0) {
            res.statusCode = 422;
            throw "'Hobby' doesn't exist!";
        }
        res.status(200).send(result);
    }
    catch (error) {
        if (typeof error === "string") {
            res.send(error);
        }
        else {
            res.status(500).send({ message: error.sqlMessage || error.message });
        }
    }
});
exports.studentHobbie = studentHobbie;
//# sourceMappingURL=studentHobbie.js.map