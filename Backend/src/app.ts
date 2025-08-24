import express from "express";
import { connectDB } from "./config/db";
import homeRoute from "./routes/homeRoute";
import cors from 'cors'
import authRoutes from "./routes/authRoutes"

const PORT = 3000;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();

app.use("/", homeRoute);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server up at http://localhost:${PORT}`);

});
