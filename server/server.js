const http = require("http");
const { queryShop } = require("./services/queryShop.js");

async function requestListener(req, res) {
  console.log(`Query ${req.url}`);

  // от УРЛа нужно отрезать слэш в начале строки
  const result = await queryShop(req.url.slice(1));
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });
  res.write(JSON.stringify(result));
  res.end();
}

const server = http.createServer(requestListener);
server.listen(8088);

console.log("Server started on http://localhost:8088/");
