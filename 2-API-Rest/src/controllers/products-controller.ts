import { Request, Response } from "express";
import { AppError } from "../utils/app-error";
import { z } from "zod";

class ProductsController {
  /*
   * index - GET para listar vários registros.
   * show - GET para listar um registro.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro.
   * remove - DELETE para remover um registro.
   */

  index(req: Request, res: Response) {
    const { page, limit } = req.query;

    res.send(`Página ${page} de ${limit}`);
  }

  create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z
        .string({ required_error: "Name is required!" })
        .trim()
        .min(6, { message: "Name must be 6 or more characteres" }),
      price: z
        .number({ required_error: "Price is required!" })
        .positive({ message: "Price must be positive!" })
        .nullish(),
    });

    const { name, price } = bodySchema.parse(req.body);

    // res.send(`Produto ${name} custa ${price}`)
    res.status(201).json({ name, price, user_id: req.user_id });
  }
}

export { ProductsController };
