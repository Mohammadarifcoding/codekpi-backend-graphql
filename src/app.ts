import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs/index";
import { resolvers } from "./graphql/resolvers/index";
// import userRouter from "./modules/user/userRoutes";
import { jwtHelper } from "./utils/jwtHelper";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());

app.use("/graphql", (a, b, c) => {
  console.log(a, b);
  c();
});

// REST API route
// app.use("/api/users", userRouter);

app.get("/", (req, res) =>
  res.json({ message: "Welcome to the CodeKpi Backend!" })
);

export const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    context: async ({ req, res }) => {
      const token = req.headers.authorization || "";
      const user = await jwtHelper.getUserInfoFromToken(token);
      return { user, res, req };
    },
  });

  await server.start();
  server.applyMiddleware({ app: app as any, path: "/graphql" });
  return app;
};
