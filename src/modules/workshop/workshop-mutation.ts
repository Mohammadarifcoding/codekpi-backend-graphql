import type { Workshop } from "@prisma/client";
import prisma from "../../services/db";
import { workshopService } from "./workshop-service";

export const workshopMutationResolver = {
  createWorkshop: async (
    _: any,
    { title, content, banner }: any,
    context: any
  ) => {
    return await workshopService.createWorkshop({
      title,
      content,
      banner,
    });
  },
  updateWorkshop: async (_: any, data: any, context: any) => {
    return await workshopService.updateWorkshop(data);
  },

  deleteWorkshop: async (_: any, { id }: any, context: any) => {
    return await workshopService.deleteWorkshop({ id });
  },
  makeWorkshopInterested: async (_: any, { workshopId }: any, context: any) => {
    return await workshopService.makeWorkshopInterested({
      workshopId,
      userId: context.user.userId,
    });
  },
  makeWorkshopNotInterested: async (
    _: any,
    { workshopId }: any,
    context: any
  ) => {
    return await workshopService.makeWorkshopNotInterested({
      workshopId,
      userId: context.user.userId,
    });
  },
};
