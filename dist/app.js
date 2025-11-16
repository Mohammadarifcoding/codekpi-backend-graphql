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
exports.startServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const index_1 = require("./graphql/typeDefs/index");
const index_2 = require("./graphql/resolvers/index");
// import userRouter from "./modules/user/userRoutes";
const jwtHelper_1 = require("./utils/jwtHelper");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use(express_1.default.json());
// REST API route
// app.use("/api/users", userRouter);
app.get("/", (req, res) => res.json({ message: "Welcome to the CodeKpi Backend!" }));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: index_1.typeDefs,
        resolvers: index_2.resolvers,
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req, res }) {
            const token = req.headers.authorization || "";
            const user = yield jwtHelper_1.jwtHelper.getUserInfoFromToken(token);
            return { user, res, req };
        }),
    });
    yield server.start();
    server.applyMiddleware({ app: app, path: "/graphql" });
    return app;
});
exports.startServer = startServer;
