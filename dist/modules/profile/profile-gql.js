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
exports.profileMutationResolver = exports.profileQueryResolver = void 0;
const profile_service_1 = require("./profile-service");
exports.profileQueryResolver = {
    profiles: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield profile_service_1.profileService.getProfiles();
    }),
    getProfile: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, {}, context) {
        return yield profile_service_1.profileService.getMyProfile(context.user.userId);
    }),
};
exports.profileMutationResolver = {
    updateProfile: (_, data, context) => __awaiter(void 0, void 0, void 0, function* () {
        return yield profile_service_1.profileService.updateProfile(context.user.userId, data);
    }),
};
