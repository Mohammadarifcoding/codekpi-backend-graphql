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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const graphql_1 = require("graphql");
const db_1 = __importDefault(require("../../services/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelper_1 = require("../../utils/jwtHelper");
const authorization_1 = require("../../utils/authorization");
const otp_1 = require("../../utils/otp");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ name, email, password }, { res }) {
    return yield db_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield validateEmailAvailable(email);
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield tx.user.create({
            data: { name, email, password: hashPassword },
        });
        // // Create profile
        // await tx.profile.create({
        //   data: { userId: newUser.id },
        // });
        const token = yield jwtHelper_1.jwtHelper.generateToken(newUser.id, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        const { password: pass } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
        return {
            message: "User created successfully",
            token,
            user: userWithoutPassword,
        };
    }));
});
const signin = (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ email, password }, { res }) {
    const user = yield findUserOrThrow({ email });
    yield checkPassword({ user, password });
    const token = yield jwtHelper_1.jwtHelper.generateToken(user.id, process.env.JWT_SECRET);
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    const { password: pass } = user, userWithoutPassword = __rest(user, ["password"]);
    return {
        message: "Signin successful",
        token,
        user: userWithoutPassword,
    };
});
const deleteUser = (_a, _b) => __awaiter(void 0, [_a, _b], void 0, function* ({ userId, deleteId, }, { res }) {
    return yield db_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield findUserOrThrow({ userId });
        if (user.id !== deleteId)
            authorization_1.authorization.requireAdmin(user);
        yield findUserOrThrow({ userId: deleteId, message: "User not found" });
        yield tx.profile.deleteMany({
            where: { userId: deleteId },
        });
        const deleteUser = yield tx.user.delete({
            where: { id: deleteId },
        });
        if (user.id === deleteId)
            res.clearCookie("token");
        return {
            message: "User deleted successfully",
            user: deleteUser,
        };
    }));
});
const updatePassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, oldPassword, newPassword }) {
    return yield db_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const findUser = yield findUserOrThrow({ userId });
        yield checkPassword({ user: findUser, password: oldPassword });
        const hashPassword = yield bcrypt_1.default.hash(newPassword, 10);
        yield tx.user.update({
            where: { id: userId },
            data: {
                password: hashPassword,
            },
        });
        return {
            message: "Password updated successfully",
        };
    }));
});
const getUsers = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10, userId) {
    const user = yield findUserOrThrow({ userId: userId });
    authorization_1.authorization.requireAdmin(user);
    const skip = (page - 1) * limit;
    const data = yield db_1.default.user.findMany({
        include: { profile: true },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
    });
    return {
        message: "Users fetched successfully ✅",
        data: data,
        page: page,
        limit: limit,
        total: yield db_1.default.user.count(),
    };
});
const createOTP = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email }) {
    yield findUserOrThrow({ email });
    const otp = (0, otp_1.generateOTP)();
    const otpHash = yield bcrypt_1.default.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    yield db_1.default.otp.create({
        data: { email, otp_hash: otpHash, expires_at: expiresAt },
    });
    yield (0, otp_1.sendVerificationEmail)(email, otp);
    return {
        message: "OTP sent successfully",
        success: true,
    };
});
const verifyOTP = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, code }) {
    const otpData = yield db_1.default.otp.findFirst({
        where: { email: email, used: false },
        orderBy: { createdAt: "desc" },
    });
    if (!otpData) {
        throw new graphql_1.GraphQLError("OTP not found", {
            extensions: { code: "NOT_FOUND" },
        });
    }
    if (otpData.expires_at < new Date()) {
        throw new graphql_1.GraphQLError("OTP expired", {
            extensions: { code: "UNAUTHENTICATED" },
        });
    }
    const compareOTP = yield bcrypt_1.default.compare(code, otpData === null || otpData === void 0 ? void 0 : otpData.otp_hash);
    if (!compareOTP) {
        throw new graphql_1.GraphQLError("Invalid OTP", {
            extensions: { code: "UNAUTHENTICATED" },
        });
    }
    yield db_1.default.otp.update({ where: { id: otpData.id }, data: { used: true } });
    const resetToken = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "10m",
    });
    return {
        message: "OTP verified successfully",
        success: true,
        verified: true,
        resetToken,
    };
});
const changePassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ token, newPassword }) {
    try {
        const { email } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const hashed = yield bcrypt_1.default.hash(newPassword, 10);
        yield db_1.default.user.update({
            where: { email },
            data: { password: hashed },
        });
        return { message: "Password changed successfully", success: true };
    }
    catch (err) {
        throw new graphql_1.GraphQLError("Invalid or expired token", {
            extensions: { code: "UNAUTHENTICATED" },
        });
    }
});
const findUserOrThrow = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, email, message, }) {
    if (!userId && !email) {
        throw new graphql_1.GraphQLError(message || "Authentication failed: user not found in context", {
            extensions: { code: "UNAUTHENTICATED" },
        });
    }
    const where = userId
        ? { id: userId }
        : { email: email };
    const user = yield db_1.default.user.findUnique({ where });
    if (!user) {
        throw new graphql_1.GraphQLError("User not found", {
            extensions: { code: "NOT_FOUND" },
        });
    }
    return user;
});
const checkPassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ user, password }) {
    const comparePassword = yield bcrypt_1.default.compare(password, user.password);
    if (!comparePassword) {
        throw new graphql_1.GraphQLError("Invalid credentials", {
            extensions: { code: "UNAUTHENTICATED" },
        });
    }
    return true;
});
const validateEmailAvailable = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield db_1.default.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new graphql_1.GraphQLError("Email already in use", {
            extensions: { code: "BAD_REQUEST" },
        });
    }
});
exports.userService = {
    createUser,
    signin,
    deleteUser,
    updatePassword,
    getUsers,
    findUserOrThrow,
    checkPassword,
    validateEmailAvailable,
    createOTP,
    verifyOTP,
    changePassword,
};
