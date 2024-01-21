const express = require("express");
const app = express();

app.get("/soma", (req, res) => {
  const soma = 100 + 1;

  res.send({ soma });
});

app.listen(3000);
