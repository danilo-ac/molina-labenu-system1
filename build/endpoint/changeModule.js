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
exports.changeModule = void 0;
const connection_1 = require("../data/connection");
const moduleChange_1 = require("../services/moduleChange");
const changeModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.classId);
        const newModule = Number(req.body.newModule) + 1;
        if (!newModule) {
            res.statusCode = 422;
            throw "'new module' incorrect";
        }
        if (newModule > 7) {
            res.statusCode = 422;
            throw "it doesn't exist newModule > 7 !";
        }
        const result = yield (0, connection_1.connection)("class")
            .where({ id });
        console.log(result);
        if (result.length === 0) {
            res.statusCode = 422;
            throw "'id' doesn't exist !";
        }
        yield (0, moduleChange_1.moduleChange)(id, newModule);
        res.status(200).send("newModule changed succesfully!");
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
exports.changeModule = changeModule;
//# sourceMappingURL=changeModule.js.map