const fetch = require("node-fetch");

exports.handler = async function(event) {
  const code = event.queryStringParameters.code;
  const DB_URL = "https://encurtador-1e26c-default-rtdb.firebaseio.com/links";

  const res = await fetch(`${DB_URL}/${code}.json`);
  const url = await res.json();

  if (url) {
    return {
      statusCode: 301,
      headers: {
        Location: url
      }
    };
  }

  return {
    statusCode: 404,
    body: "Link não encontrado"
  };
};
