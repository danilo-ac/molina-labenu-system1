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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putTeacherClass = exports.validateParams = exports.validateBody = void 0;
const updateTeacherClass_1 = __importDefault(require("../services/updateTeacherClass"));
function validateBody(actionType, body) {
    const expectedObject = ["classId"];
    const errorTips = [];
    const checkers = {
        isValidBodyLength: (input) => {
            return Object.keys(input).length === expectedObject.length;
        },
        isValidBodyKeys: (input) => {
            return Object.getOwnPropertyNames(input)
                .map((item) => expectedObject
                .includes(item)).every(item => item === true);
        },
        isValidClassId: (input, keyName) => {
            if (input.trim().length > 0 && input.trim().length <= 255) {
                if (!Number.isInteger(input * 1)) {
                    errorTips.push(`'${keyName}' value must be a number`);
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                errorTips.push(`'${keyName}' is empty or longer than 255 characters`);
                return false;
            }
        }
    };
    const expectedValues = {
        classId: (input) => checkers.isValidClassId(input, "classId")
    };
    const validationType = {
        new: {
            keys: (input) => checkers.isValidBodyLength(input) && checkers.isValidBodyKeys(input),
            values: (input) => Object.getOwnPropertyNames(input)
                .map(item => { return expectedValues[item](input[item]); })
                .every(item => item === true)
        },
        edit: {
            keys: (input) => checkers.isValidBodyKeys(input),
            values: (input) => Object.getOwnPropertyNames(input)
                .map(item => { return expectedValues[item](body[item]); })
                .every(item => item === true)
        }
    };
    if (!body) {
        throw new Object({ status: 400, message: "Empty Body" });
    }
    else if (!validationType[actionType].keys(body)) {
        throw new Object({
            status: 406,
            message: "Invalid or missing Body Property Key",
            tips: `Expected properties keys: ${expectedObject}`
        });
    }
    else if (!validationType[actionType].values(body)) {
        throw new Object({
            status: 406,
            message: "Invalid or missing Body Property Value",
            tips: errorTips
        });
    }
    else {
        return true;
    }
}
exports.validateBody = validateBody;
function validateParams(param) {
    if (!param) {
        throw new Object({
            status: 400,
            message: "Invalid or missing path params",
            tips: "'teacherId' is required"
        });
    }
    else if (!Number.isInteger(param * 1)) {
        throw new Object({
            status: 400,
            message: "Invalid or missing path params",
            tips: "'teacherId' value must be a number"
        });
    }
    else {
        return true;
    }
}
exports.validateParams = validateParams;
const putTeacherClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (validateParams(req.params.teacherId) && validateBody("new", req.body)) {
            const body = {
                teacherId: Number(req.params.teacherId),
                classId: Number(req.body.classId * 1)
            };
            const result = yield (0, updateTeacherClass_1.default)(body);
            if (!result[0] || !result) {
                throw new Object({
                    status: 404,
                    message: "Invalid or missing path params",
                    tips: "Not found ID of 'teacherId'"
                });
            }
            else {
                return res.status(200).send(result[0]).end();
            }
        }
    }
    catch (err) {
        res.status(err.status)
            .send({ message: err.message, error: err.tips })
            .end();
    }
});
exports.putTeacherClass = putTeacherClass;
//# sourceMappingURL=putTeacherClass.js.map