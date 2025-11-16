import * as z from "zod";
export declare const CommitteeRoleEnum: z.ZodEnum<{
    PRESIDENT: "PRESIDENT";
    VICE_PRESIDENT: "VICE_PRESIDENT";
    GENERAL_SECRETARY: "GENERAL_SECRETARY";
    JOINT_GENERAL_SECRETARY: "JOINT_GENERAL_SECRETARY";
    FINANCE_SECRETARY: "FINANCE_SECRETARY";
    OFFICE_SECRETARY: "OFFICE_SECRETARY";
    MEDIA_SECRETARY: "MEDIA_SECRETARY";
    COMMUNICATION_SECRETARY: "COMMUNICATION_SECRETARY";
    PUBLICITY_SECRETARY: "PUBLICITY_SECRETARY";
    MENTOR: "MENTOR";
    ADVISOR: "ADVISOR";
    REPRESENTATIVE: "REPRESENTATIVE";
}>;
export declare const createCommitteeSchema: z.ZodObject<{
    name: z.ZodString;
    year: z.ZodNumber;
}, z.core.$strip>;
export declare const updateCommitteeSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    year: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const CommitteeMemberCreateSchema: z.ZodObject<{
    committeeId: z.ZodString;
    role: z.ZodEnum<{
        PRESIDENT: "PRESIDENT";
        VICE_PRESIDENT: "VICE_PRESIDENT";
        GENERAL_SECRETARY: "GENERAL_SECRETARY";
        JOINT_GENERAL_SECRETARY: "JOINT_GENERAL_SECRETARY";
        FINANCE_SECRETARY: "FINANCE_SECRETARY";
        OFFICE_SECRETARY: "OFFICE_SECRETARY";
        MEDIA_SECRETARY: "MEDIA_SECRETARY";
        COMMUNICATION_SECRETARY: "COMMUNICATION_SECRETARY";
        PUBLICITY_SECRETARY: "PUBLICITY_SECRETARY";
        MENTOR: "MENTOR";
        ADVISOR: "ADVISOR";
        REPRESENTATIVE: "REPRESENTATIVE";
    }>;
    name: z.ZodString;
    email: z.ZodString;
    department: z.ZodEnum<{
        COMPUTER: "COMPUTER";
        CIVIL: "CIVIL";
        ELECTRICAL: "ELECTRICAL";
        MECHANICAL: "MECHANICAL";
        ELECTRONICS: "ELECTRONICS";
        POWER: "POWER";
        AUTOMOBILE: "AUTOMOBILE";
        RAC: "RAC";
        OTHER: "OTHER";
    }>;
    session: z.ZodString;
    speciality: z.ZodString;
    phone: z.ZodString;
    memberPicture: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    positionOrder: z.ZodOptional<z.ZodNumber>;
    year: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateCommitteeMemberSchema: z.ZodObject<{
    committeeId: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<{
        PRESIDENT: "PRESIDENT";
        VICE_PRESIDENT: "VICE_PRESIDENT";
        GENERAL_SECRETARY: "GENERAL_SECRETARY";
        JOINT_GENERAL_SECRETARY: "JOINT_GENERAL_SECRETARY";
        FINANCE_SECRETARY: "FINANCE_SECRETARY";
        OFFICE_SECRETARY: "OFFICE_SECRETARY";
        MEDIA_SECRETARY: "MEDIA_SECRETARY";
        COMMUNICATION_SECRETARY: "COMMUNICATION_SECRETARY";
        PUBLICITY_SECRETARY: "PUBLICITY_SECRETARY";
        MENTOR: "MENTOR";
        ADVISOR: "ADVISOR";
        REPRESENTATIVE: "REPRESENTATIVE";
    }>>;
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    department: z.ZodOptional<z.ZodEnum<{
        COMPUTER: "COMPUTER";
        CIVIL: "CIVIL";
        ELECTRICAL: "ELECTRICAL";
        MECHANICAL: "MECHANICAL";
        ELECTRONICS: "ELECTRONICS";
        POWER: "POWER";
        AUTOMOBILE: "AUTOMOBILE";
        RAC: "RAC";
        OTHER: "OTHER";
    }>>;
    session: z.ZodOptional<z.ZodString>;
    speciality: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    memberPicture: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    positionOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    year: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
}, z.core.$strip>;
export declare const committeeValidation: {
    createCommitteeSchema: z.ZodObject<{
        name: z.ZodString;
        year: z.ZodNumber;
    }, z.core.$strip>;
    updateCommitteeSchema: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        year: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    CommitteeMemberCreateSchema: z.ZodObject<{
        committeeId: z.ZodString;
        role: z.ZodEnum<{
            PRESIDENT: "PRESIDENT";
            VICE_PRESIDENT: "VICE_PRESIDENT";
            GENERAL_SECRETARY: "GENERAL_SECRETARY";
            JOINT_GENERAL_SECRETARY: "JOINT_GENERAL_SECRETARY";
            FINANCE_SECRETARY: "FINANCE_SECRETARY";
            OFFICE_SECRETARY: "OFFICE_SECRETARY";
            MEDIA_SECRETARY: "MEDIA_SECRETARY";
            COMMUNICATION_SECRETARY: "COMMUNICATION_SECRETARY";
            PUBLICITY_SECRETARY: "PUBLICITY_SECRETARY";
            MENTOR: "MENTOR";
            ADVISOR: "ADVISOR";
            REPRESENTATIVE: "REPRESENTATIVE";
        }>;
        name: z.ZodString;
        email: z.ZodString;
        department: z.ZodEnum<{
            COMPUTER: "COMPUTER";
            CIVIL: "CIVIL";
            ELECTRICAL: "ELECTRICAL";
            MECHANICAL: "MECHANICAL";
            ELECTRONICS: "ELECTRONICS";
            POWER: "POWER";
            AUTOMOBILE: "AUTOMOBILE";
            RAC: "RAC";
            OTHER: "OTHER";
        }>;
        session: z.ZodString;
        speciality: z.ZodString;
        phone: z.ZodString;
        memberPicture: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        positionOrder: z.ZodOptional<z.ZodNumber>;
        year: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>;
    updateCommitteeMemberSchema: z.ZodObject<{
        committeeId: z.ZodOptional<z.ZodString>;
        role: z.ZodOptional<z.ZodEnum<{
            PRESIDENT: "PRESIDENT";
            VICE_PRESIDENT: "VICE_PRESIDENT";
            GENERAL_SECRETARY: "GENERAL_SECRETARY";
            JOINT_GENERAL_SECRETARY: "JOINT_GENERAL_SECRETARY";
            FINANCE_SECRETARY: "FINANCE_SECRETARY";
            OFFICE_SECRETARY: "OFFICE_SECRETARY";
            MEDIA_SECRETARY: "MEDIA_SECRETARY";
            COMMUNICATION_SECRETARY: "COMMUNICATION_SECRETARY";
            PUBLICITY_SECRETARY: "PUBLICITY_SECRETARY";
            MENTOR: "MENTOR";
            ADVISOR: "ADVISOR";
            REPRESENTATIVE: "REPRESENTATIVE";
        }>>;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        department: z.ZodOptional<z.ZodEnum<{
            COMPUTER: "COMPUTER";
            CIVIL: "CIVIL";
            ELECTRICAL: "ELECTRICAL";
            MECHANICAL: "MECHANICAL";
            ELECTRONICS: "ELECTRONICS";
            POWER: "POWER";
            AUTOMOBILE: "AUTOMOBILE";
            RAC: "RAC";
            OTHER: "OTHER";
        }>>;
        session: z.ZodOptional<z.ZodString>;
        speciality: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        memberPicture: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
        positionOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        year: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    }, z.core.$strip>;
};
export type CommitteeMemberInput = z.infer<typeof CommitteeMemberCreateSchema>;
export type UpdateCommitteeMemberInput = z.infer<typeof updateCommitteeMemberSchema>;
export type CreateCommitteeInput = z.infer<typeof createCommitteeSchema>;
export type UpdateCommitteeInput = z.infer<typeof updateCommitteeSchema>;
//# sourceMappingURL=committee-validation.d.ts.map