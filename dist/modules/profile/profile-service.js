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
exports.profileService = void 0;
const graphql_1 = require("graphql");
const db_1 = __importDefault(require("../../services/db"));
const user_service_1 = require("../user/user-service");
const getProfiles = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield db_1.default.profile.findMany({
        include: { user: true },
    });
});
const getMyProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield db_1.default.user.findUnique({
        where: { id: userId },
        include: { profile: true, interestedWorkshops: true },
    });
    if (!profile) {
        throw new graphql_1.GraphQLError("Profile Not found", {
            extensions: { code: "BAD_REQUEST" },
        });
    }
    return {
        message: "Profile fetched successfully",
        user: profile,
    };
});
const updateProfile = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_service_1.userService.findUserOrThrow({ userId });
    const updateProfile = yield db_1.default.profile.update({
        where: { userId: userId },
        data: Object.assign({}, data),
        include: { user: true },
    });
    return {
        message: "Profile updated successfully",
        profile: updateProfile,
    };
});
exports.profileService = {
    getProfiles,
    getMyProfile,
    updateProfile,
};
