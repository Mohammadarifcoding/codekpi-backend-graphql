import { CommitteeService } from "./committee-service";

export const committeeQueryResolver = {
  allCommittees: async (parent: any, args: any, context: any) => {
    return await CommitteeService.getAllCommittees();
  },
};

export const committeeMutationResolver = {
  createCommittee: async (parent: any, args: any, context: any) => {
    return await CommitteeService.createCommittee(
      args?.input,
      context?.user?.userId
    );
  },
  deleteCommittee: async (parent: any, args: any, context: any) => {
    return await CommitteeService.deleteCommittee(
      args?.id,
      context?.user?.userId
    );
  },
  updateCommittee: async (parent: any, args: any, context: any) => {
    return await CommitteeService.updateCommittee(
      args?.id,
      args?.input,
      context?.user?.userId
    );
  },
  createCommitteeMember: async (parent: any, args: any, context: any) => {
    return await CommitteeService.createCommitteeMember(
      args?.input,
      context?.user?.userId
    );
  },
};
