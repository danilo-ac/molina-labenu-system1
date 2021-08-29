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
exports.addStudentInClass = void 0;
const studentInClass_1 = require("../services/studentInClass");
const addStudentInClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const classID = Number(req.body.classID);
        const id = Number(req.params.studentId);
        if (!classID) {
            res.statusCode = 422;
            throw "'classId' não preenchidos ";
        }
        if (!id) {
            res.statusCode = 422;
            throw "'id' não existente";
        }
        yield (0, studentInClass_1.studentInClass)(id, classID);
        res.status(200).send("usuário criado");
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
exports.addStudentInClass = addStudentInClass;
//# sourceMappingURL=addStudentInClass.js.map