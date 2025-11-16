"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const mutation_1 = require("./mutation");
const query_1 = require("./query");
exports.resolvers = {
    Query: query_1.Query,
    Mutation: mutation_1.Mutation,
    // Review: {
    //   userImage: async (parent: any, args: any, ctx: any) => {
    //     if (!parent.userImageId) return null;
    //     return await ctx.prisma.picture.findUnique({
    //       where: { id: parent.userImageId },
    //     });
    //   },
    // },
    // Workshop: {
    //   banner: async (parent: any, args: any, ctx: any) => {
    //     if (!parent.bannerId) return null;
    //     return await ctx.prisma.picture.findUnique({
    //       where: { id: parent.bannerId },
    //     });
    //   },
    // },
    // User: {
    //   avatar: async (parent: any, args: any, ctx: any) => {
    //     if (!parent.avatarId) return null;
    //     return await ctx.prisma.picture.findUnique({
    //       where: { id: parent.avatarId },
    //     });
    //   },
    // },
    // Review: {
    //   userImage: async (parent: any, args: any, ctx: any) => {
    //     if (!parent.userImageId) return null;
    //     return await ctx.prisma.picture.findUnique({
    //       where: { id: parent.userImageId },
    //     });
    //   },
    // },
};
