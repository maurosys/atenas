const app = require("./src/app.js");
const server = require("http").createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`> server is running in the port: ${port}`);
});
