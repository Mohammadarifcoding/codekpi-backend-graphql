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
exports.workshopService = exports.updateWorkshop = void 0;
const graphql_1 = require("graphql");
const db_1 = __importDefault(require("../../services/db"));
const user_service_1 = require("../user/user-service");
const picture_service_1 = require("../picture/picture-service");
const createWorkshop = (_a) => __awaiter(void 0, [_a], void 0, function* ({ title, content, banner, }) {
    return yield db_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const picture = yield picture_service_1.pictureService.createPicture(banner, tx);
        const newWorkshop = yield tx.workshop.create({
            data: {
                title,
                content,
                banner: { connect: { id: picture.id } },
            },
            include: {
                banner: true,
            },
        });
        return {
            message: "Workshop created successfully ✅",
            workshop: newWorkshop,
        };
    }));
});
const updateWorkshop = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, input }) {
    return yield db_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, content, banner } = input;
        yield findWorkshopOrThrow({ workshopId: id }); // ensure it's using same tx
        const data = {};
        if (title)
            data.title = title;
        if (content)
            data.content = content;
        if (banner) {
            const picture = yield picture_service_1.pictureService.createPicture(banner, tx);
            data.banner = { connect: { id: picture.id } };
        }
        const updatedWorkshop = yield tx.workshop.update({
            where: { id },
            data,
            include: { banner: true },
        });
        return {
            message: "Workshop updated successfully ✅",
            workshop: updatedWorkshop,
        };
    }));
});
exports.updateWorkshop = updateWorkshop;
const deleteWorkshop = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id }) {
    return yield db_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield findWorkshopOrThrow({ workshopId: id });
        yield tx.workshop.update({
            where: { id },
            data: {
                interestedUsers: {
                    set: [],
                },
            },
        });
        const deletedWorkshop = yield tx.workshop.delete({
            where: { id },
        });
        return {
            message: "Workshop deleted successfully ✅",
            workshop: deletedWorkshop,
        };
    }));
});
const makeWorkshopInterested = (_a) => __awaiter(void 0, [_a], void 0, function* ({ workshopId, userId, }) {
    return yield db_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_service_1.userService.findUserOrThrow({ userId });
        yield findWorkshopOrThrow({ workshopId });
        const updatedWorkshop = yield tx.workshop.update({
            where: { id: workshopId },
            data: {
                interestedUsers: {
                    connect: { id: user.id },
                },
            },
            include: { interestedUsers: true },
        });
        return {
            message: "Workshop marked as interested ✅",
            workshop: updatedWorkshop,
        };
    }));
});
const makeWorkshopNotInterested = (_a) => __awaiter(void 0, [_a], void 0, function* ({ workshopId, userId, }) {
    return yield db_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_service_1.userService.findUserOrThrow({ userId });
        yield findWorkshopOrThrow({ workshopId });
        const updatedWorkshop = yield tx.workshop.update({
            where: { id: workshopId },
            data: {
                interestedUsers: {
                    disconnect: { id: user.id },
                },
            },
            include: { interestedUsers: true },
        });
        return {
            message: "Workshop removed from interested ✅",
            workshop: updatedWorkshop,
        };
    }));
});
const findWorkshopOrThrow = (_a) => __awaiter(void 0, [_a], void 0, function* ({ workshopId }) {
    if (!workshopId) {
        throw new graphql_1.GraphQLError("Internal server error", {
            extensions: { code: "INTERNAL_SERVER_ERROR" },
        });
    }
    const workshop = yield db_1.default.workshop.findUnique({
        where: { id: workshopId },
    });
    if (!workshop) {
        throw new graphql_1.GraphQLError("Workshop not found", {
            extensions: { code: "NOT_FOUND" },
        });
    }
    return workshop;
});
const getAllWorkshop = () => __awaiter(void 0, void 0, void 0, function* () {
    const workshops = yield db_1.default.workshop.findMany({
        include: { interestedUsers: true, banner: true },
    });
    return {
        message: "Workshop fetched successfully ✅",
        workshops: workshops,
    };
});
exports.workshopService = {
    createWorkshop,
    updateWorkshop: exports.updateWorkshop,
    deleteWorkshop,
    makeWorkshopInterested,
    makeWorkshopNotInterested,
    findWorkshopOrThrow,
    getAllWorkshop,
};
