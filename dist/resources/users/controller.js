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
exports.createAUser = exports.getAllUsers = void 0;
const authgenerator_1 = require("../../utilities/authgenerator");
const services_1 = __importDefault(require("./services"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield services_1.default.findMany();
    res.json({ data: allUsers });
});
exports.getAllUsers = getAllUsers;
const createAUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    // New user created with a hashed password
    const createdUser = yield services_1.default.create(newUser);
    const token = authgenerator_1.createToken({
        id: createdUser.id,
        username: createdUser.username,
    });
    res.cookie('token', token, { httpOnly: true });
    res.json({ data: { username: createdUser.username } });
});
exports.createAUser = createAUser;
//# sourceMappingURL=controller.js.map