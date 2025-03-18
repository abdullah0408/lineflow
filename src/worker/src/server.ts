// import "dotenv/config";
// import app from "./app";
// import { runWorkers } from "./workerManager";

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () => {
//     console.log(`🚀 Server is running on port ${PORT}`);
//     runWorkers();
// });

import { runWorkers } from "./workerManager";

console.log("🚀 Starting Task Workers...");
runWorkers();
