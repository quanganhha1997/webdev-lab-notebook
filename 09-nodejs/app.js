const http = require("http");
const static = require("node-static");
const querystring = require("node:querystring");

const port = process.env.PORT || 5002;

const file = new static.Server("./exercise");

const server = http.createServer((req, res) => {
  // main route
  if (req.method === "GET" && req.url === "/") {
    file.serveFile("/welcome.html", 200, {}, req, res);
  }

  // form route
  else if (req.method === "GET" && req.url === "/form") {
    file.serveFile("/form.html", 200, {}, req, res);
  }

  // form submission route
  else if (req.method === "POST" && req.url === "/formSubmit") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const userdata = querystring.parse(body);
      const { usernameInput: name, emailInput: email } = userdata;

      res.writeHead(200, { "Content-Type": "text/html" });

      res.write(`
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Submission Received</title>
</head>

<body>
  <main>
    <p>Thank you for submitting your information:</p>
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
  </main>
</body>
</html>
`);

      res.end();
    });
  }

  // fallback for unknown routes
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Not Found</h1>");
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/form`);
});
