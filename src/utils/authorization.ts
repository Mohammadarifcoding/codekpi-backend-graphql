import type { User } from "@prisma/client";
import { GraphQLError } from "graphql";

const requireAuth = (user: Partial<User>) => {
  if (!user)
    throw new GraphQLError("Not authenticated", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  return user;
};

const requireRole = (user: Partial<User>, ...allowedRoles: string[]) => {
  console.log(user, allowedRoles);
  requireAuth(user);
  if (!user.role || !allowedRoles.includes(user.role)) {
    throw new GraphQLError("Not authorized", {
      extensions: { code: "UNAUTHORIZED" },
    });
  }
};

const requireAdmin = (user: Partial<User>) => requireRole(user, "ADMIN");

const requireUser = (user: Partial<User>) => requireRole(user, "USER");

const requireModerator = (user: Partial<User>) =>
  requireRole(user, "MODERATOR");

export const authorization = {
  requireAuth,
  requireRole,
  requireAdmin,
  requireUser,
  requireModerator,
};
