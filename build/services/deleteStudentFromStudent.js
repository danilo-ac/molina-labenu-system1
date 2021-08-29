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
exports.deleteStudentFromStudent = void 0;
const connection_1 = require("../data/connection");
function deleteStudentFromStudent(studentId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isExistStudent = yield (0, connection_1.connection)("student").count("* as res").where({ id: studentId });
            if (isExistStudent[0].res === 0) {
                throw new Object({
                    status: 406,
                    message: "Invalid or missing Body Property Value",
                    tips: `ID '${studentId}' does not exist`
                });
            }
            try {
                yield (0, connection_1.connection)("student_hobby")
                    .where("student_id", "=", studentId)
                    .delete();
                try {
                    yield (0, connection_1.connection)("student")
                        .where("id", "=", studentId)
                        .delete();
                }
                catch (err) {
                    throw new Object({
                        status: 500,
                        message: err.message,
                        tips: "Internal error"
                    });
                }
            }
            catch (err) {
                if (err.errno === 1452) {
                    throw new Object({
                        status: 404,
                        message: "Invalid or missing Body Property Value",
                        tips: "Not found ID of 'classId'"
                    });
                }
                else {
                }
                throw new Object({
                    status: 500,
                    message: err.message,
                    tips: "Internal error"
                });
            }
        }
        catch (err) {
            throw err;
        }
    });
}
exports.deleteStudentFromStudent = deleteStudentFromStudent;
//# sourceMappingURL=deleteStudentFromStudent.js.map