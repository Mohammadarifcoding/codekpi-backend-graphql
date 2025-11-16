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
exports.workshopMutationResolver = exports.workshopQueryResolver = void 0;
const workshop_service_1 = require("./workshop-service");
exports.workshopQueryResolver = {
    workshops: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield workshop_service_1.workshopService.getAllWorkshop();
    }),
};
exports.workshopMutationResolver = {
    createWorkshop: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { input: { title, content, banner } }, context) {
        const data = yield workshop_service_1.workshopService.createWorkshop({
            title,
            content,
            banner,
        });
        return data;
    }),
    updateWorkshop: (_, data, context) => __awaiter(void 0, void 0, void 0, function* () {
        return yield workshop_service_1.workshopService.updateWorkshop(data);
    }),
    deleteWorkshop: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { id }, context) {
        return yield workshop_service_1.workshopService.deleteWorkshop({ id });
    }),
    makeWorkshopInterested: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { workshopId }, context) {
        return yield workshop_service_1.workshopService.makeWorkshopInterested({
            workshopId,
            userId: context.user.userId,
        });
    }),
    makeWorkshopNotInterested: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { workshopId }, context) {
        return yield workshop_service_1.workshopService.makeWorkshopNotInterested({
            workshopId,
            userId: context.user.userId,
        });
    }),
};
