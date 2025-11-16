import { Mutation } from "./mutation";
import { Query } from "./query";

export const resolvers = {
  Query: Query,
  Mutation: Mutation,
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
