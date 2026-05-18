import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes";
import { AppError } from "./utils/app-error";

const PORT = 3333;

const app = express();
app.use(express.json());

app.use(routes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  res.status(500).json({ message: error.message });
});

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
