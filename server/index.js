import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/jwtAuth.js";
import pool from "./db.js";

dotenv.config();

const app = express();

//middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.use("/auth", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server running on port", port, "...");
});
