import jwt from "jsonwebtoken";
export declare const jwtHelper: {
    generateToken: (userId: string, secret: string) => Promise<string>;
    verifyToken: (token: string, secret: string) => Promise<string | jwt.JwtPayload>;
    getUserInfoFromToken: (token: string) => Promise<{
        userId: string;
    } | null>;
};
//# sourceMappingURL=jwtHelper.d.ts.map