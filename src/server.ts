import { startServer } from "./app";

const PORT = 4000;

startServer().then((app) => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
