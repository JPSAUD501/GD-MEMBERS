const {createFile, loadData, saveData, updateMemberData} = require("./data");
const {bday} = require("./bday");
const moment = require('moment');
moment.locale('pt-br');

function keepDataUpdated(client, veterantime, fusotime, botrelease, guildid, datafile){
  function checkEveryMinute () {
    console.log('Checking!');
    var data = loadData(datafile);
    var lastUpdate = moment(Date.now()+fusotime).format('DD/MM/YYYY');
    if (JSON.stringify(lastUpdate) !== JSON.stringify(data.lastUpdate)) {
      //New day! Checking everything and send messages!
      const guild = client.guilds.cache.get(guildid);
      var memberCounterNumber = 0;
      if(!("memberList" in data)) {
        data["memberList"] = {};
        console.log("Creating member list (index)");
        saveData(datafile, data);
      }
      guild.members.cache.each(member => {
        memberCounterNumber++
        console.log(memberCounterNumber,"Members");
        updateMemberData(member, data, datafile, botrelease, fusotime);
      });

      data = loadData(datafile);

      var memberCounter = {
        "membersNow": memberCounterNumber,
        "membersInList": Object.keys(data.memberList).length
      };

      if (JSON.stringify(memberCounter) !== JSON.stringify(data.memberCounter)) {
        data.memberCounter = memberCounter;
        console.log("Saving member counter (index)");
        saveData(datafile, data);
      } 

      if(data.memberCounter.membersNow < data.memberCounter.membersInList) deleteFromList(datafile, data, guild);
        
      //Last update
      data.lastUpdate = lastUpdate;
      data.lastUpdateUnix = Date.now();
      console.log("New day update! (keepDataUpdated)");
      saveData(datafile, data);

      //Checking bdays
      var list = Object.keys(data.memberList);
      for (const i in list){
        bday(client, guildid, fusotime, data.memberList[list[i]]);
      }
  } 
}

checkEveryMinute();
var interval = setInterval(function () { checkEveryMinute(); }, 60000);

}

module.exports = {
    keepDataUpdated: keepDataUpdated
};