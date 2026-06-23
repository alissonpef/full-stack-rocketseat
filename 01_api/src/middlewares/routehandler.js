import { routes } from "../routes.js";
import { extractQueryParams } from "../utils/extract-query-params.js";
import { Database } from "../database.js";

const database = new Database();

export function routeHandler(req, res) {
  const route = routes.find((route) => {
    return route.method === req.method && route.path.test(req.url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);
    const { query, ...params } = routeParams.groups;

    req.params = params;
    // Verifico se existe uma query, se existir eu chamo a função extract, se não eu devolvo uma lista vazia
    req.query = query ? extractQueryParams(query) : {};
    // Dessa maneira podemos declarar na ordem que quisermos e não propriamente na ordem que foi retornada
    return route.controller({ req, res, database });
  }

  return res.writeHead(404).end("Rota não encontrada!");
}
