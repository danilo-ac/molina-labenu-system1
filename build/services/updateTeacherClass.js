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
const connection_1 = require("../data/connection");
function updateTeacherClass(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, connection_1.connection)("teacher")
                .where({ id: body.teacherId })
                .update({ class_id: body.classId });
            try {
                const consultRegister = yield (0, connection_1.connection)("teacher")
                    .join("class", "teacher.class_id", "=", "class.id")
                    .where("teacher.id", "=", body.teacherId)
                    .select("teacher.id as teacherId", "teacher.name as teacherName", "teacher.class_id as classId", "class.name as className", "class.type as classType", "class.module as classModule");
                return consultRegister;
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
    });
}
exports.default = updateTeacherClass;
//# sourceMappingURL=updateTeacherClass.js.map