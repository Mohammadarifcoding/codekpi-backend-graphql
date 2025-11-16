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
exports.userMutationResolver = exports.userQueryResolver = void 0;
const user_service_1 = require("./user-service");
exports.userQueryResolver = {
    users: (args, data, context) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        return yield user_service_1.userService.getUsers(data === null || data === void 0 ? void 0 : data.skip, data === null || data === void 0 ? void 0 : data.limit, (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.userId);
    }),
};
exports.userMutationResolver = {
    createUser: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { name, email, password }, context) {
        return yield user_service_1.userService.createUser({ name, email, password }, context);
    }),
    signin: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { email, password }, context) {
        return yield user_service_1.userService.signin({ email, password }, context);
    }),
    deleteUser: (_, data, context) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        return yield user_service_1.userService.deleteUser({
            userId: (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.userId,
            deleteId: data === null || data === void 0 ? void 0 : data.userId,
        }, context);
    }),
    updatePassword: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { oldPassword, newPassword }, context) {
        return yield user_service_1.userService.updatePassword({
            userId: context.user.userId,
            oldPassword,
            newPassword,
        });
    }),
    createOTP: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { email }, context) {
        return yield user_service_1.userService.createOTP({ email });
    }),
    verifyOTP: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { email, code }, context) {
        return yield user_service_1.userService.verifyOTP({ email, code });
    }),
    changePassword: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { token, newPassword }, context) {
        return yield user_service_1.userService.changePassword({ token, newPassword });
    }),
};
