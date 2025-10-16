const express = require("express");
const connectToDb = require("./database/db");
const app = express();
const router = require("./routes/route");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173", // or whatever your frontend port is
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", router);
connectToDb();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is listenig on port ${PORT}`);
});
