import { workshopService } from "./workshop-service";

export const workshopQueryResolver = {
  workshops: async () => {
    return await workshopService.getAllWorkshop();
  },
};

export const workshopMutationResolver = {
  createWorkshop: async (
    _: any,
    { input: { title, content, banner } }: any,
    context: any
  ) => {
    const data = await workshopService.createWorkshop({
      title,
      content,
      banner,
    });
    return data;
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
