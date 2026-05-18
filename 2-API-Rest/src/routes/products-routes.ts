import { Router } from "express";
import { myMiddleware } from "../middleware/my-middleware";

const productsRoutes = Router();

productsRoutes.get("/:id", (req, res) => {
  const { id } = req.params; // URL
  const { page, limit } = req.query;

  res.send(`Produto ${id}, página ${page} de ${limit}`);
});

productsRoutes.post("/", myMiddleware, (req, res) => {
  const { name, price } = req.body;

  // res.send(`Produto ${name} custa ${price}`)
  res.status(201).json({ name, price, user_id: req.user_id });
});

export { productsRoutes };
