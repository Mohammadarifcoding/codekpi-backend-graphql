"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = 4000;
(0, app_1.startServer)().then((app) => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
