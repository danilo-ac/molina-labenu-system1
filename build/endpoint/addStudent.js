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
exports.addStudent = void 0;
const connection_1 = require("../data/connection");
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, birth_date, hobby } = req.body;
        if (!name || !email || !birth_date || !hobby) {
            res.statusCode = 422;
            throw "'name', 'email', 'birth_date' ou 'hobby' não digitados ";
        }
        yield (0, connection_1.connection)("student")
            .insert({
            name: name,
            email: email,
            birth_date: birth_date
        });
        yield (0, connection_1.connection)("hobby")
            .insert({
            name: hobby
        });
        const userId = yield connection_1.connection.raw(`SELECT id FROM student WHERE email="${email}"`);
        const hobbyId = yield connection_1.connection.raw(`SELECT id FROM hobby WHERE name="${hobby}"`);
        yield (0, connection_1.connection)("student_hobby")
            .insert({
            student_id: userId[0][0].id,
            hobby_id: hobbyId[0][0].id
        });
        res.status(200).send("ok");
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
exports.addStudent = addStudent;
//# sourceMappingURL=addStudent.js.map