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
exports.deleteClassTeacher = void 0;
const connection_1 = require("../data/connection");
const deleteClassTeacher = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isExistTeacher = yield (0, connection_1.connection)("teacher").count("* as res").where({ id: id });
        if (isExistTeacher[0].res === 0) {
            throw new Object({
                status: 406,
                message: "ID '${id}' does not exist"
            });
        }
        try {
            yield (0, connection_1.connection)("teacher")
                .update({
                class_id: null
            })
                .where({ id });
        }
        catch (err) {
            return err;
        }
    }
    catch (err) {
        return err;
    }
});
exports.deleteClassTeacher = deleteClassTeacher;
//# sourceMappingURL=deleteClassTeacher.js.map