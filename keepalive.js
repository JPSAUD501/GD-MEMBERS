const {loadData} = require("./functions/data");
const express = require("express");
const server = express();
const fs = require('fs')
 
function keepAlive(datafile) {
  server.listen(2000, () => { console.log("Server is Ready!") });

  server.all('/', (req, res) => {
  var data = loadData(datafile)
  var membros = Object.keys(data.memberList)
  var lista = "<h1>LISTA GDVERSARIO</h1><br>"
  for (const i in membros){
    lista = lista + data.memberList[membros[i]].user + " faltam " + data.memberList[membros[i]].daysToBday + " dias" + "<br><br>";
  }
  res.send(lista)
  })
}

 
module.exports = keepAlive;