import z from "zod";

export const DepartmentEnum = z.enum([
  "COMPUTER",
  "CIVIL",
  "ELECTRICAL",
  "MECHANICAL",
  "ELECTRONICS",
  "POWER",
  "AUTOMOBILE",
  "RAC",
  "OTHER",
]);

export const ShiftEnum = z.enum(["MORNING", "EVENING"]);
export const GenderEnum = z.enum(["MALE", "FEMALE", "OTHER"]);
