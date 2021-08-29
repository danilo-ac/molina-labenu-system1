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
exports.deleteStudent = exports.validateParams = void 0;
const deleteStudentFromStudent_1 = require("../services/deleteStudentFromStudent");
function validateParams(param) {
    if (!param) {
        throw new Object({
            status: 400,
            message: "Invalid or missing path params",
            tips: "'studentId' is required"
        });
    }
    else if (!Number.isInteger(param * 1)) {
        throw new Object({
            status: 400,
            message: "Invalid or missing path params",
            tips: "'studentId' value must be a number"
        });
    }
    else {
        return true;
    }
}
exports.validateParams = validateParams;
function deleteStudent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (validateParams(req.params.studentId)) {
                const result = yield (0, deleteStudentFromStudent_1.deleteStudentFromStudent)(Number(req.params.studentId));
                return res.status(200).send(`Success to DELETE 'studentId':${req.params.studentId}`).end();
            }
        }
        catch (err) {
            res.status(err.status)
                .send({ message: err.message, error: err.tips })
                .end();
        }
    });
}
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=deleteStudent.js.map