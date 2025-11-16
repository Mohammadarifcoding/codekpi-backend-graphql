"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const graphql_1 = require("graphql");
const requireAuth = (user) => {
    if (!user)
        throw new graphql_1.GraphQLError("Not authenticated", {
            extensions: { code: "UNAUTHENTICATED" },
        });
    return user;
};
const requireRole = (user, ...allowedRoles) => {
    requireAuth(user);
    if (!user.role || !allowedRoles.includes(user.role)) {
        throw new graphql_1.GraphQLError("Not authorized", {
            extensions: { code: "UNAUTHORIZED" },
        });
    }
};
const requireAdmin = (user) => requireRole(user, "ADMIN");
const requireUser = (user) => requireRole(user, "USER");
const requireModerator = (user) => requireRole(user, "MODERATOR");
exports.authorization = {
    requireAuth,
    requireRole,
    requireAdmin,
    requireUser,
    requireModerator,
};
