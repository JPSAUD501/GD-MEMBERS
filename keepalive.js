const {loadData} = require("./functions/data");
const express = require("express");
const path = require('path');
const server = express();
const fs = require('fs')
 
function keepAlive(datafile) {
  server.listen(2000, () => { console.log("Server is Ready!") });

  function html(orderby, i){
    let data = loadData(datafile)
    let membros = Object.keys(data.memberList)
    let lista = []
    for (const i in membros){
      lista.push(data.memberList[membros[i]]);
    }
    if(!i){
      lista.sort(function(a, b){
        return (a[orderby] - b[orderby]) 
      });
    } else{
      lista.sort(function(a, b){
        return (b[orderby] - a[orderby]) 
      });
    }
    let txt = ""
    lista.forEach(function(member){
      txt += `<a href=\"${member.avatarUrl}\"><img border=\"0\" alt=\"${member.user}\" src=\"${member.avatarUrl}\" width=\"100\" height=\"100\"></a><br>` +"Membro: \"" + member.user + "\"<br>Faltam: " + member.daysToBday + " dias" + "<br>Entrou: " + member.joinString + "<br>Há: " + member.memberSinceDays + " dias" + "<br><br>";
    });
    return txt;
  }
  
  server.all('/', (req, res) => {
    server.use(express.static(__dirname + '/site'));
    res.sendFile(path.join(__dirname,'','site/index.html'));
  })

  server.all('/poi', (req, res) => {
    server.use(express.static(__dirname + '/poi'));
    res.sendFile(path.join(__dirname,'','poi/index-poi.html'));
  })
}

 
module.exports = keepAlive;