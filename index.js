const keepAlive = require("./keepalive");
const {deleteFromList} = require("./functions/oldMembers");
const {createFile, loadData, saveData} = require("./functions/data");
const {timeToString, birthday, daysToBday} = require("./functions/moment");
const Discord = require("discord.js");
const moment = require('moment');
moment.locale('pt-br');
const veterantime = 2592000;
const fusotime = -10800000;
const botrelease = 1634688000;
const guildid = "720275637415182416";

keepAlive();

const datafile = "./data.json";

var data = loadData(datafile);

const client = new Discord.Client({
  fetchAllMembers: true,
  restTimeOffset: 0,
  shards: "auto",
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
        "GUILDS",
        "GUILD_MEMBERS",
        "GUILD_BANS",
        "GUILD_INTEGRATIONS",
        "GUILD_WEBHOOKS",
        "GUILD_INVITES",
        "GUILD_VOICE_STATES",
        "GUILD_PRESENCES",
        "GUILD_MESSAGES",
        "GUILD_MESSAGE_REACTIONS",
        "GUILD_MESSAGE_TYPING",
        "DIRECT_MESSAGES",
        "DIRECT_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_TYPING",
    ]
});

//Reload and update data.json
client.on("ready", () => {
    const guild = client.guilds.cache.get(guildid);
    var memberCounterNumber = 0;
    if(!("memberList" in data)) {
      data["memberList"] = {};
      saveData(datafile, data);
      console.log("a");
    }
    guild.members.cache.each(member => {

      function restoreMemberData(name){
        data = loadData(datafile)
        if(name in data.memberList[member.user.id]){
          return (data.memberList[member.user.id])[name];
        }else{
          return null;
        }
      }

      memberCounterNumber++
      console.log(memberCounterNumber);

      if(!(member.user.id in data.memberList)) {
        data.memberList[member.user.id] = {};
        saveData(datafile, data);
        console.log("b");
      }

      if(restoreMemberData("authorized") == true && restoreMemberData("authorizedTimeUnix") !== null){
        if(data.memberList[member.user.id].veteranTimeUnix !== restoreMemberData("authorizedTimeUnix")+veterantime){
          data.memberList[member.user.id].veteranTimeUnix = restoreMemberData("authorizedTimeUnix")+veterantime;
          saveData(datafile, data);
          console.log("c");
        }
      } else if(restoreMemberData("authorized") == false){
        if(data.memberList[member.user.id].veteranTimeUnix = "null"){
          data.memberList[member.user.id].veteranTimeUnix = "null";
          saveData(datafile, data);
          console.log("e");
        }
      }
      
      if(restoreMemberData("veteranTimeUnix") == null){
        var veteranDate = null
      } else{
        var veteranDate = moment(restoreMemberData("veteranTimeUnix")+fusotime).format('DD/MM/YYYY')
      }

      if(restoreMemberData("veteranTimeUnix") == null){
        var veteranString = null
      } else {
        var veteranString = timeToString(restoreMemberData("veteranTimeUnix"), fusotime)
      }

      var veteran = restoreMemberData("veteranTimeUnix") <= Date.now();

      if((member.joinedTimestamp) << botrelease){
        if(restoreMemberData("authorized") !== true || restoreMemberData("legacyMember") !== true) {
          data.memberList[member.user.id].authorized = true;
          data.memberList[member.user.id].authorizedById = "141957307591426050";
          data.memberList[member.user.id].authorizedByName = "JPSAUD501";
          data.memberList[member.user.id].legacyMember = true
          saveData(datafile, data);
          console.log("f");
        }
      }

      var memberdata = {
         "id": member.user.id,
         "user": member.user.username,
         "noob": member._roles.includes("896257202426376192"),
         "bot": member.user.bot,
         "birthday": birthday(member.joinedTimestamp, fusotime),
         "daysToBday": daysToBday(member.joinedTimestamp, fusotime),
         "joinTimeUnix": member.joinedTimestamp,
         "joinDate": moment(member.joinedTimestamp+fusotime).format('DD/MM/YYYY'),
         "joinString": timeToString(member.joinedTimestamp, fusotime),
         "veteranTimeUnix": restoreMemberData("veteranTimeUnix"),
         "veteranDate": veteranDate,
         "veteranString": veteranString,
         "veteran": veteran,
         "authorized": restoreMemberData("authorized"),
         "authorizedTimeUnix": restoreMemberData("authorizedTimeUnix"),
         "authorizedById": restoreMemberData("authorizedById"),
         "authorizedByName": restoreMemberData("authorizedByName"),
         "legacyMember": restoreMemberData("legacyMember"),
         "msg": restoreMemberData("msg")
      } 

    if (JSON.stringify(memberdata) !== JSON.stringify(data.memberList[member.user.id])) {
      data.memberList[member.user.id] = memberdata;
      saveData(datafile, data);
      console.log("y");
    }
  });

  var memberCounter = {
    "membersNow": memberCounterNumber,
    "membersInList": Object.keys(data.memberList).length
  };

  if (JSON.stringify(memberCounter) !== JSON.stringify(data.memberCounter)) {
    data.memberCounter = memberCounter;
    saveData(datafile, data);
    console.log("y");
  } 

  if(data.memberCounter.membersNow < data.memberCounter.membersInList) deleteFromList(datafile, data, guild);

});



client.login(process.env['token']);