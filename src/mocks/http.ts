import { createMiddleware } from "@mswjs/http-middleware";
import express from "express";
import cors from "cors";
import { handlers } from "./handlers";

const app = express();
const port = 9090;

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(createMiddleware(...handlers));

app.listen(port, () => console.log(`목업서버 실행중 포트 ${port}`));
