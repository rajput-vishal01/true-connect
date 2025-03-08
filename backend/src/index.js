import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("True-Connect");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
