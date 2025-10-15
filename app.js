const express = require("express");
const connectToDb = require("./database/db");
const app = express();
const router = require("./routes/route");
app.use(express.json());
app.use("/api", router);
connectToDb();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is listenig on port ${PORT}`);
});
