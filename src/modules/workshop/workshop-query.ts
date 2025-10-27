import prisma from "../../services/db";
import { workshopService } from "./workshop-service";

export const workshopQueryResolver = {
  workshops: async () => {
    return await workshopService.getAllWorkshop();
  },
};
