const http = require("http");
const fs = require("fs");
const url = require("url");

http
  .createServer((req, res) => {
    const myURL = new URL(req.url, `http://localhost:8080`);
    let filename = "." + myURL.pathname + ".html";
    if (myURL.pathname === `/`) {
      filename = "./index.html";
    }
    fs.readFile(filename, function (err, data) {
      if (err || !data) {
        res.writeHead(404, { "Content-Type": "text/html" });
        fs.readFile(`./404.html`, (err, data) => {
          res.write(data);
          return res.end();
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
