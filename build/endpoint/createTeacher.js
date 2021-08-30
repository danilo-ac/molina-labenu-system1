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
exports.createTeachers = void 0;
const connection_1 = require("../data/connection");
function createTeachers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("oi");
        try {
            const { name, email, birth_date, skill_name } = req.body;
            if (!name || !email || !birth_date || !skill_name) {
                res.statusCode = 422;
                throw "Dude.. put your'name', 'email', 'address' and 'skill_name' please";
            }
            const result = yield connection_1.connection("teacher")
                .insert({
                name: name,
                email: email,
                birth_date: birth_date,
                skill_name: skill_name,
            });
            console.log(result);
            yield connection_1.connection("skill")
                .insert({
                name: skill_name
            });
            const teacherId = yield connection_1.connection.raw(`SELECT id FROM teacher WHERE email="${email}"`);
            const skillId = yield connection_1.connection.raw(`SELECT id FROM skill WHERE name="${skill_name}"`);
            yield connection_1.connection("teacher_skill")
                .insert({
                teacher_id: teacherId[0][0].id,
                skill_id: skillId[0][0].id
            });
            res.status(200).send(`Teacher created successfully"`);
        }
        catch (error) {
            if (typeof error === "string") {
                res.send(error);
            }
            else {
                res.status(500).send(error.sqlMessage || error.message);
            }
        }
    });
}
exports.createTeachers = createTeachers;
//# sourceMappingURL=createTeacher.js.map
