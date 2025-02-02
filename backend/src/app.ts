import express from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import workshopRoutes from "./routes/workshopRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/workshops", workshopRoutes);

export default app;
