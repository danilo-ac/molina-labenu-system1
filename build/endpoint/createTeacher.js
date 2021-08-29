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
const teacher_1 = require("../services/teacher");
function createTeachers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, birth_date } = req.body;
            if (!name || !email || !birth_date) {
                res.statusCode = 422;
                throw "Dude.. put your'name', 'email' and 'address' please";
            }
            yield (0, teacher_1.teacherSS)(name, email, birth_date);
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