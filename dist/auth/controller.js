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
exports.logOutUser = exports.loginUser = void 0;
const services_1 = require("./services");
const authgenerator_1 = require("../utilities/authgenerator");
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // user details
    const userDetails = req.body;
    try {
        // Check if credentials are valid
        const loggedUser = yield services_1.foundUserWithValidation(userDetails);
        // Create user passport/token
        const token = authgenerator_1.createToken({
            id: loggedUser.id,
            username: loggedUser.username,
        });
        res.cookie('token', token, { httpOnly: true });
        // result
        res.json({
            user: {
                msg: `Hello ${loggedUser.username}! You are now logged in`,
                username: loggedUser.username,
            },
        });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
exports.loginUser = loginUser;
function logOutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.clearCookie('token');
        res.json({ msg: `Sad to see you go! You have now logged out.`, data: null });
    });
}
exports.logOutUser = logOutUser;
//# sourceMappingURL=controller.js.map