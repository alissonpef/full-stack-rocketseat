export async function jsonBodyHandler(req, res) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    // Concatena os chunk e converte para string. Em seguida, converte a string para json.
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }

  // Define que o header de resposta como json
  res.setHeader("Content-Type", "application/json");
}
