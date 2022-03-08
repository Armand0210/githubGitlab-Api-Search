const fetch = require("node-fetch");

const getData = async (url) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  return jsonResponse;
};

module.exports = { getData };
