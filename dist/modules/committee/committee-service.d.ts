import type { ApiResponse } from "../../constants/ApiResponse";
import { type CreateCommitteeInput, type UpdateCommitteeInput, type CommitteeMemberInput } from "./committee-validation";
/**
 * @desc Create a new committee
 */
export declare const createCommittee: (input: CreateCommitteeInput, userId: string) => Promise<ApiResponse>;
/**
 * @desc Delete a committee by ID
 */
export declare const deleteCommittee: (id: string, userId: string) => Promise<ApiResponse>;
export declare const CommitteeService: {
    createCommittee: (input: CreateCommitteeInput, userId: string) => Promise<ApiResponse>;
    deleteCommittee: (id: string, userId: string) => Promise<ApiResponse>;
    updateCommittee: (id: string, data: UpdateCommitteeInput, userId: string) => Promise<ApiResponse>;
    getAllCommittees: () => Promise<ApiResponse>;
    createCommitteeMember: (input: CommitteeMemberInput, userId: string) => Promise<ApiResponse>;
};
//# sourceMappingURL=committee-service.d.ts.map