const {createFile, loadData, saveData, updateMemberData} = require("./data");
const {bday} = require("./bday");
const {deleteFromList} = require("./oldMembers")
const moment = require('moment');
moment.locale('pt-br');

async function keepDataUpdated(client, botrelease, guildid, datafile){
  //saveData("./poi/poi.json", {"text": "Aguardando rodada..."});

  async function checkEveryMinute () {
    console.log('Checking!');
    var data = loadData(datafile);
    var lastUpdate = moment(Date.now()).format('DD/MM/YYYY');
    console.log("Day: " + lastUpdate);
    if (JSON.stringify(lastUpdate) !== JSON.stringify(data.lastUpdate)) {
      //New day! Checking everything and send messages!
      const guild = client.guilds.cache.get(guildid);
      var memberCounterNumber = 0;
      guild.members.cache.each(member => {
        memberCounterNumber++
        console.log(memberCounterNumber,"Members");
        updateMemberData(member, data, datafile, botrelease, guildid, client, memberCounterNumber);
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
      data.lastUpdateUnix = Date.now();
      console.log("New day update! (keepDataUpdated)");
      saveData(datafile, data);

      //Checking bdays
      var list = Object.keys(data.memberList);
      for (const i in list){
        if(!i) return;
        await bday(client, guildid, datafile, data.memberList[list[i]]);
      }

      //BKP data.json
      client.channels.cache.get(process.env['channelbkp']).send({content:`BKP - ${moment(Date.now()).format('DD/MM/YYYY')}`, files: ["./"+datafile]});
    }
  }

checkEveryMinute();
  var interval = setInterval(function () { checkEveryMinute(); }, 60000);
}

module.exports = {
    keepDataUpdated: keepDataUpdated
};