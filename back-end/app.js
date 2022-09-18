const express = require("express");
const path = require("path");

const app = express();

app.get("/v1/index.prod.user.js", (req, res) => {
  res.sendFile(path.join(__dirname, "resource/index.prod.user.js"));
});

// Error handler
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send("Internal Serverless Error");
});

// Web 类型云函数，只能监听 9000 端口
app.listen(9000, () => {
  console.log(`Server start on http://localhost:9000`);
});
