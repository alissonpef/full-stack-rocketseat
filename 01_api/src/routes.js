import { parseRoutePath } from "./utils/parseRoutePath.js";

export const routes = [
  {
    method: "GET",
    path: "/products",
    controller: ({ req, res, database }) => {
      const products = database.select("products");

      return res.end(JSON.stringify(products));
    },
  },
  {
    method: "POST",
    path: "/products",
    controller: ({ req, res, database }) => {
      const { name, price } = req.body;

      database.insert("products", { name, price });

      return res.writeHead(201).end(JSON.stringify(req.body));
    },
  },
  {
    method: "DELETE",
    path: "/products/:id",
    controller: ({ req, res }) => {
      return res
        .writeHead(201)
        .end("Produto removido com ID: " + req.params.id);
    },
  },
].map((route) => ({
  ...route, // Copia todas as propriedades do objeto 'route' original, basicamente um path: route.path
  path: parseRoutePath(route.path),
}));
