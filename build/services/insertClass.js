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
function insertClass(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isExistClass = yield (0, connection_1.connection)("class").count("* as res").where({ name: body.name });
            if (isExistClass[0].res >= 1) {
                throw new Object({
                    status: 406,
                    message: "Invalid or missing Body Property Value",
                    tips: `Name '${body.name}' already exist`
                });
            }
            else {
                try {
                    yield (0, connection_1.connection)("class")
                        .insert(body);
                    try {
                        const consultRegister = yield (0, connection_1.connection)("class").select("*").where({ name: body.name });
                        const covertDate = (input) => {
                            return `${input.getFullYear()}/${(((input.getMonth() + 1) * 0.01) % 1).toFixed(2).substring(2)}/${input.getDate()}`;
                        };
                        const result = {
                            id: consultRegister[0].id,
                            name: consultRegister[0].name,
                            type: consultRegister[0].type,
                            startDate: covertDate(consultRegister[0].start_date),
                            endDate: covertDate(consultRegister[0].end_date),
                            module: consultRegister[0].module
                        };
                        return result;
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
                    throw new Object({
                        status: 500,
                        message: err.message,
                        tips: "Internal error"
                    });
                }
            }
        }
        catch (err) {
            return err;
        }
    });
}
exports.default = insertClass;
//# sourceMappingURL=insertClass.js.map