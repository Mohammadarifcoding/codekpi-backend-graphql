import type { PrismaClient } from "@prisma/client";
export declare const pictureService: {
    createPicture: (image: string, tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$extends">) => Promise<{
        id: string;
        image: string;
    }>;
};
//# sourceMappingURL=picture-service.d.ts.map