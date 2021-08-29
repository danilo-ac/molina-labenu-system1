"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const addStudentInClass_1 = require("./endpoint/addStudentInClass");
const getStudentAge_1 = require("./endpoint/getStudentAge");
const deleteTeacherClass_1 = require("./endpoint/deleteTeacherClass");
const changeModule_1 = require("./endpoint/changeModule");
const addStudent_1 = require("./endpoint/addStudent");
const teacherClass_1 = require("./endpoint/teacherClass");
const studentHobbie_1 = require("./endpoint/studentHobbie");
const deleteStudentClass_1 = require("./endpoint/deleteStudentClass");
const studentClass_1 = require("./endpoint/studentClass");
const createClass_1 = require("./endpoint/createClass");
const putTeacherClass_1 = require("./endpoint/putTeacherClass");
const deleteStudent_1 = require("./endpoint/deleteStudent");
const createTeacher_1 = require("./endpoint/createTeacher");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/student/create", addStudent_1.addStudent);
app.post("/teacher/create", createTeacher_1.createTeachers);
app.post("/class", createClass_1.createClass);
app.post("/student/add/:studentId", addStudentInClass_1.addStudentInClass);
app.put("/teacher/:teacherId", putTeacherClass_1.putTeacherClass);
app.get("/student/age/:studentId", getStudentAge_1.getStudentAge);
app.get("/student/show/:classId", studentClass_1.studentClass);
app.get("/class/teacherInClass/:classId", teacherClass_1.teacherClass);
app.get("/student/hobby/:hobbyName", studentHobbie_1.studentHobbie);
app.post("/student/deleteClass/:studentId", deleteStudentClass_1.deleteStudentClass);
app.delete("/student/:studentId", deleteStudent_1.deleteStudent);
app.post("/teacher/deleteClass/:teacherId", deleteTeacherClass_1.deleteTeacherClass);
app.post("/class/changeModule/:classId", changeModule_1.changeModule);
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address();
        console.log(`Server is running in http://localhost: ${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});
//# sourceMappingURL=index.js.map