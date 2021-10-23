const {saveData} = require("./data");

function deleteFromList(datafile, data, guildid, client){
const guild = client.guilds.cache.get(guildid);
  var list = Object.keys(data.memberList);
  var allmembers = [];
  guild.members.cache.each(member => {
    allmembers.push(member.id);
  })
  for (const i in list){
    if (!allmembers.includes(list[i])) {
      console.log(data.memberList[list[i]]);
      if(data.memberList[list[i]].msgId){
        var channel = guild.channels.cache.get(process.env["mainchnnel"]);
        try{channel.fetchMessage(data.memberList[list[i]].msgId).then(msg => msg.delete());}catch{}
      }
      delete data.memberList[list[i]];
      console.log("Deleting old member from data (oldMember)")
      saveData(datafile, data)
    }
  }
}

module.exports = {
    deleteFromList: deleteFromList
};