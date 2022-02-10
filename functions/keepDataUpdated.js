const {createFile, loadData, saveData, updateMemberData} = require("./data");
const {bday} = require("./bday");
const {deleteFromList} = require("./oldMembers")
const moment = require('moment');
moment.locale('pt-br');

function keepDataUpdated(client, fusotime, botrelease, guildid, datafile){
  //saveData("./poi/poi.json", {"text": "Aguardando rodada..."});

  function checkEveryMinute () {
    console.log('Checking!');
    var data = loadData(datafile);
    var lastUpdate = moment(Date.now()).format('DD/MM/YYYY');
    if (JSON.stringify(lastUpdate) !== JSON.stringify(data.lastUpdate)) {
      //New day! Checking everything and send messages!
      const guild = client.guilds.cache.get(guildid);
      var memberCounterNumber = 0;
      guild.members.cache.each(member => {
        memberCounterNumber++
        console.log(memberCounterNumber,"Members");
        updateMemberData(member, data, datafile, botrelease, fusotime, guildid, client, memberCounterNumber);
      });

      data = loadData(datafile);

      var memberCounter = {
        "membersNow": memberCounterNumber,
        "membersInList": Object.keys(data.memberList).length
      };

      if (JSON.stringify(memberCounter) !== JSON.stringify(data.memberCounter)) {
        data.memberCounter = memberCounter;
        console.log("Saving member counter (keepDataUpdated)");
        saveData(datafile, data);
      } 

      if(data.memberCounter.membersNow < data.memberCounter.membersInList) deleteFromList(datafile, data, guildid, client);
        
      //Last update
      data.lastUpdate = lastUpdate;
      data.lastUpdateUnix = Date.now()+fusotime;
      console.log("New day update! (keepDataUpdated)");
      saveData(datafile, data);

      //Checking bdays
      var list = Object.keys(data.memberList);
      for (const i in list){
        if(!i) return;
        bday(client, guildid, fusotime, datafile, data.memberList[list[i]]);
      }

      //BKP data.json
      client.channels.cache.get(process.env['channelbkp']).send({content:`BKP - ${moment(Date.now()+0).format('DD/MM/YYYY')}`, files: ["./"+datafile]});
    }
  }

checkEveryMinute();
var interval = setInterval(function () { checkEveryMinute(); }, 60000);

}

module.exports = {
    keepDataUpdated: keepDataUpdated
};