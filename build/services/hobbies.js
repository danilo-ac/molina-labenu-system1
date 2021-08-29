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
exports.hobbies = void 0;
const connection_1 = require("../data/connection");
const hobbies = (hobby) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield connection_1.connection.raw(`
        select student.name from student_hobby
        join student
        on student_hobby.student_id=student.id
        join hobby
        on student_hobby.hobby_id = hobby.id
        where hobby.name = "${hobby}"
        `);
    return result[0];
});
exports.hobbies = hobbies;
//# sourceMappingURL=hobbies.js.map