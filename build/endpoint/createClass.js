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
exports.createClass = exports.validateBody = void 0;
const insertClass_1 = __importDefault(require("../services/insertClass"));
function validateBody(actionType, body) {
    const expectedObject = ["name", "type", "startDate", "endDate"];
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
        isValidName: (input) => {
            if (input.trim().length > 0 && input.trim().length <= 255) {
                if (!isNaN(input) || input.split("").some((item) => Number(item))) {
                    errorTips.push("Invalid name. Only letter is acceptable");
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                errorTips.push("Name is empty or longer than 255 characters");
                return false;
            }
        },
        isValidType: (input) => {
            if (input.trim().length > 0 && input.trim().length <= 255) {
                if (!isNaN(input) || input.split("").some((item) => Number(item))) {
                    errorTips.push("Invalid name. Only letter is acceptable");
                    return false;
                }
                else if (!["integral", "noturno"].includes(input.toLowerCase())) {
                    errorTips.push("Invalid value on type key. Acceptable values: 'integral' or 'noturno'");
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                errorTips.push("Type is empty or longer than 255 characters");
                return false;
            }
        },
        isValidDate: (input, keyName) => {
            if (input.trim().length > 0 && input.trim().length <= 255) {
                if (!Date.parse(input.split("/").map((item) => {
                    return Number(item) > 0 && !isNaN(item) && item;
                }))) {
                    errorTips.push(`${keyName} value must YYYY/MM/DD formart`);
                    return false;
                }
                else {
                    const today = new Date().getFullYear() + new Date().getMonth() * 0.1 + new Date().getDate() * 0.01;
                    const insertedDate = new Date(input).getFullYear() + new Date(input).getMonth() * 0.1 + new Date(input).getDate() * 0.01;
                    if (insertedDate < today) {
                        errorTips.push(`'${keyName}' value must be higher than current date`);
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
            else {
                errorTips.push("Date is empty or longer than 255 characters");
                return false;
            }
        },
        isValidEndDate: (input) => {
            if (!expectedValues.startDate) {
                errorTips.push("Impossible to check 'endDate' once 'startDate' is invalid or missing");
                return false;
            }
            else {
                const endDate = new Date(input).getFullYear() + new Date(input).getMonth() * 0.1 + new Date(input).getDate() * 0.01;
                const startDate = new Date(body.startDate).getFullYear() + new Date(body.startDate).getMonth() * 0.1 + new Date(body.startDate).getDate() * 0.01;
                if (startDate >= endDate) {
                    errorTips.push(`'enDate' must be higher than 'startDate'`);
                    return false;
                }
                else {
                    return true;
                }
            }
        }
    };
    const expectedValues = {
        name: (input) => checkers.isValidName(input),
        type: (input) => checkers.isValidType(input),
        startDate: (input) => checkers.isValidDate(input, "startDate"),
        endDate: (input) => checkers.isValidDate(input, "endDate") && checkers.isValidEndDate(input),
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
const setBodyNewClass = (body) => {
    const { name, type, startDate, endDate } = body;
    const newBody = {
        name: type === "noturno" ? name + "-na-night" : name,
        type: type,
        start_date: startDate,
        end_date: endDate,
        module: 1
    };
    return newBody;
};
const createClass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (validateBody("new", req.body)) {
            const result = yield (0, insertClass_1.default)(setBodyNewClass(req.body));
            return res.status(200).send(result).end();
        }
    }
    catch (err) {
        res.status(err.status)
            .send({ message: err.message, error: err.tips })
            .end();
    }
});
exports.createClass = createClass;
//# sourceMappingURL=createClass.js.map