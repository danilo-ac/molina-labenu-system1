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
exports.studentClass = void 0;
const connection_1 = require("../data/connection");
const studentClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.classId);
        const result = yield connection_1.connection.raw(`
      SELECT class_id,student.name,class.name from class
      JOIN student
      ON class.id = student.class_id
      WHERE class.id="${id}"
    `);
        console.log(result[0]);
        res.status(200).send(result[0]);
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
exports.studentClass = studentClass;
//# sourceMappingURL=studentClass.js.map