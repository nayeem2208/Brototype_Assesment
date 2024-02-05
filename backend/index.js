import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import Router from "./routes/routes.js";
import bodyParser from "body-parser";


const port = process.env.PORT || 3001;
connectDB();

const app = express();

app.use(express.static("backend/public"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

const corsOptions = {
  origin: ["http://localhost:2000"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/", Router);


if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend","dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}


const server = app.listen(port, () => {
  console.log(`server connected to ${port}`);
});