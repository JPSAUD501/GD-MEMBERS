const keepAlive = require("./keepalive");
const {deleteFromList} = require("./functions/oldMembers");
const {createFile, loadData, saveData, updateMemberData} = require("./functions/data");
const {timeToString, birthday, daysToBday} = require("./functions/moment");
const {keepDataUpdated} = require("./functions/keepDataUpdated");
const Discord = require("discord.js");
const moment = require('moment');
moment.locale('pt-br');
const veterantime = 2592000;
const fusotime = -10800000;
const botrelease = 1634688000;
const guildid = "720275637415182416";

keepAlive();

const datafile = "./data.json";

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
    var data = loadData(datafile);
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

  var lastUpdate = moment(Date.now()+fusotime).format('DD/MM/YYYY')
  if (JSON.stringify(lastUpdate) !== JSON.stringify(data.lastUpdate)) {
    data.lastUpdate = lastUpdate;
    console.log("New day update! (index)");
    saveData(datafile, data);
  } 
  
keepDataUpdated(client, veterantime, fusotime, botrelease, guildid, datafile)
//verificateMessages(client, )
//waitMessagesReacts(client, )

});



client.login(process.env['token']);