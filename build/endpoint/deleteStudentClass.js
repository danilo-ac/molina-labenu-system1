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
exports.deleteStudentClass = void 0;
const deleteClassStudent_1 = require("../services/deleteClassStudent");
const deleteStudentClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.studentId;
        if (!id) {
            res.statusCode = 422;
            throw " 'id' não existe! ";
        }
        yield (0, deleteClassStudent_1.deleteClassStudent)(id);
        res.status(200).send("Estudante deletado na turma com sucesso");
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
exports.deleteStudentClass = deleteStudentClass;
//# sourceMappingURL=deleteStudentClass.js.map