const soma = (req, res) => {
  const soma = 100 + 2;

  res.send({ soma });
};

module.exports = { soma };
