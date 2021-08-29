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
exports.getStudentAge = void 0;
const getStudantsByID_1 = require("../services/getStudantsByID");
const getStudentAge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.studentId;
        const result = yield (0, getStudantsByID_1.getStudantsByID)(id);
        if (!result) {
            res.statusCode = 422;
            throw "'id' não existe";
        }
        const today = new Date().getFullYear() + new Date().getMonth() * 0.1;
        const birthday = new Date(result.birth_date).getFullYear() + new Date(result.birth_date).getMonth() * 0.1;
        const age = Math.trunc(today - birthday);
        res.status(200).send(`A idade do estudante ${result.name} é ${age}`);
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
exports.getStudentAge = getStudentAge;
//# sourceMappingURL=getStudentAge.js.map