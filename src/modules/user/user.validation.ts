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
