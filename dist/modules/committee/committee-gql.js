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
exports.committeeMutationResolver = exports.committeeQueryResolver = void 0;
const committee_service_1 = require("./committee-service");
exports.committeeQueryResolver = {
    allCommittees: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        return yield committee_service_1.CommitteeService.getAllCommittees();
    }),
};
exports.committeeMutationResolver = {
    createCommittee: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        return yield committee_service_1.CommitteeService.createCommittee(args === null || args === void 0 ? void 0 : args.input, (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.userId);
    }),
    deleteCommittee: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        return yield committee_service_1.CommitteeService.deleteCommittee(args === null || args === void 0 ? void 0 : args.id, (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.userId);
    }),
    updateCommittee: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        return yield committee_service_1.CommitteeService.updateCommittee(args === null || args === void 0 ? void 0 : args.id, args === null || args === void 0 ? void 0 : args.input, (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.userId);
    }),
    createCommitteeMember: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        return yield committee_service_1.CommitteeService.createCommitteeMember(args === null || args === void 0 ? void 0 : args.input, (_a = context === null || context === void 0 ? void 0 : context.user) === null || _a === void 0 ? void 0 : _a.userId);
    }),
};
