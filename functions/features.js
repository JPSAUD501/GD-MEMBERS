const {loadData, memberLevel} = require("./data");
const {birthday} = require("./moment");

function callName(client, guildid, datafile, fusotime){
  function everyMinute(){
    var guild = client.guilds.cache.get(guildid);
    guild.channels.cache.forEach(channel => {
      if(channel.parentId !== "720275637415182420") return;
      if(!channel.name.includes("┊")) return;
      channel.members.forEach(member => {
        if(memberLevel(member) < 50) return;
        var data = loadData(datafile);
        if(data.memberList[member.user.id].birthday == birthday(Date.now(), fusotime)){
          var gdvcallname = "🎊┊"+member.user.username
          if(channel.name == gdvcallname) return;
          //if(channel.name.includes("🎊")) return;
          console.log("Gdversariante present in the voice channel (features)");
          channel.setName("🎊┊"+member.user.username);
        }
      });
    });
  }
  var loop = setInterval(function(){ everyMinute(); }, 10000);
}

module.exports = {
    callName: callName
};