import express from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import workshopRoutes from "./routes/workshopRoutes";
import registrationRoutes from "./routes/registrationRoutes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/workshops", workshopRoutes);
app.use("/registrations", registrationRoutes);

export default app;
