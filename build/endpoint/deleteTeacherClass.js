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
exports.deleteTeacherClass = void 0;
const deleteClassTeacher_1 = require("../services/deleteClassTeacher");
const getTeacher_1 = require("../services/getTeacher");
const deleteTeacherClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.teacherId);
        if (!id) {
            res.statusCode = 422;
            throw " 'id' doesn't exist! ";
        }
        const result = yield (0, getTeacher_1.getTeacher)(id);
        const checkId = result.find((x) => {
            return x.id === id;
        });
        if (!checkId) {
            res.statusCode = 422;
            throw " 'id' doesn't exist! ";
        }
        yield (0, deleteClassTeacher_1.deleteClassTeacher)(id);
        res.status(200).send("Teacher delete sucesfully");
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
exports.deleteTeacherClass = deleteTeacherClass;
//# sourceMappingURL=deleteTeacherClass.js.map