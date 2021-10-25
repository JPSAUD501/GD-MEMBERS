const {loadData, memberLevel} = require("./data");
const {birthday} = require("./moment");

function callName(client, guildid, datafile, fusotime){
  function everyMinute(){
  try{
    var data = loadData(datafile);
    var guild = client.guilds.cache.get(guildid);
    guild.channels.cache.forEach(channel => {
      if(channel.parentId !== "720275637415182420") return;
      if(!channel.name.includes("┊")) return;
      channel.members.forEach(member => {
        if((memberLevel(member) < 40) && (data.memberList[member.user.id].memberSinceDays > 0)) return;
        if(data.memberList[member.user.id].birthday == birthday(Date.now(), fusotime)){
          var gdvcallname = "🎊┊"+member.user.username
          if(channel.name == gdvcallname) return;
          if(channel.name.includes("🎊")) return;
          console.log("Gdversariante or new member present in the voice channel (features)");
          channel.setName("🎊┊"+member.user.username);
        }
      });
    });
  }catch(e){console.log(e)}
  }

  function every30Minutes(){
  try{
    var guild = client.guilds.cache.get(guildid);
    guild.members.fetch().then(members => { members.forEach(member => {
      try{
        let m = member
        member.presence.activities.forEach(function(activity){

          if(activity.applicationId == "700136079562375258"){
            //VALORANT
            console.log(m.user.username, "---", activity);
          }
          if(activity.applicationId == "401518684763586560"){
            //LoL
            console.log(m.user.username, "---", activity);
          }
          if(activity.applicationId == "821361671729709086"){
            //BlueStacks 5
            console.log(m.user.username, "---", activity);
          }

        });
      }catch(e){}      
    })}).catch(console.error);
  }catch(e){console.log(e)}
  }
  everyMinute();
  every30Minutes();
  var loop1 = setInterval(function(){ everyMinute(); }, 30000);
  var loop2 = setInterval(function(){ every30Minutes(); }, 60000*15);
}

module.exports = {
    callName: callName
};