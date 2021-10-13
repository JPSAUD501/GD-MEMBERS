const express = require("express");
const server = express();
const fs = require('fs')

server.all('/', (req, res) => {
  res.send("Alive!")
})
 
function keepAlive() {
  server.listen(2000, () => { console.log("Server is Ready!") });
}

 
module.exports = keepAlive;