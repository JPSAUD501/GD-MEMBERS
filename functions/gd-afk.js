const names = require("./afkNames").names;

const afkTag = "[AFK]";
var timer = [];
var firstCheck = true;

async function afkCheckProcess(client, guildid){
  try{
  console.log("Afks: (gd-afk)");
  console.log(timer);
  if((Object.keys(timer).length <= 0) && firstCheck == true){
    console.log("First afkCheck (gd-afk)");
    firstCheck = false;
    var guild = await client.guilds.cache.get(guildid);
    guild.members.cache.each(member => {
      if(!member.nickname) return;
      if(member.nickname.endsWith(afkTag)){
        var nick = member.nickname.replace(afkTag, "");
        if(nick.length <= 0) nick = null;
        try{member.setNickname(nick);}catch(e){}
      }
    });
  }else{
    var guild = await client.guilds.cache.get(guildid);
    for(var i in timer){
      if(!i) return;
      if((timer[i] + (60000*5) + (60000*0.5)) <= Date.now()){
        console.log("No longer afk - Time (gd-afk)");
        delete timer[i];
        guild.members.fetch(i).then(member => { 
          if(!member.nickname) return;
          if(member.nickname.endsWith(afkTag)){
            var nick = member.nickname.replace(afkTag, "");
            if(nick.length <= 0) nick = null;
            try{member.setNickname(nick);}catch(e){}
          }
        });
      }
    }
  }
  }catch(e){console.log(e, " (gd-afk)")}
}

async function afkCheck(client, guildid){
  afkCheckProcess(client, guildid);
  var loop = setInterval(function(){ afkCheckProcess(client, guildid); }, 60000*0.5);
}

async function afkTyping(typing, client, guildid){
  try{
  for(var i in timer){
    if(!i) return;
    if(i == typing.member.user.id){
      console.log("No longer afk - Typing (gd-afk)");
      delete timer[i];
      if(!typing.member.nickname) return;
      if(typing.member.nickname.endsWith(afkTag)){
        var nick = typing.member.nickname.replace(afkTag, "");
        if(nick.length <= 0) nick = null;
        try{typing.member.setNickname(nick);}catch(e){}
      }
    }
  }
  }catch(e){console.log(e), " (gd-afk)"}
}

async function afkNewState(oldState, newState, client, guildid){
  try{
  if(!oldState.channel){}else if(oldState.channel.parentId == "771255883543216171") return;
  if(!newState.channel){}else if(newState.channel.parentId == "771255883543216171") return;

  for(var i in timer){
    if(!i) return;
    if(i == newState.id){
      console.log("No longer afk - New State (gd-afk)");
      delete timer[i];
      var guild = client.guilds.cache.get(guildid);
      var member = await guild.members.fetch(newState.id);
      if(!member.nickname) return;
      if(member.nickname.endsWith(afkTag)){
        var nick = member.nickname.replace(afkTag, "");
        if(nick.length <= 0) nick = null;
        try{member.setNickname(nick);}catch(e){}
      }
    }
  }

  }catch(e){console.log(e), " (gd-afk)"}
}

async function afk(oldState, newState, client, guildid){
  try{
    if(oldState.guild.id !== guildid) return;
    if(newState.guild.id !== guildid) return;

    const delay = ms => new Promise(res => setTimeout(res, ms));

    var guild = client.guilds.cache.get(guildid);
    
    if(oldState.channel){
      if (oldState.channel.name.startsWith("🚯┆") && oldState.channel.parent.id == "771255883543216171"){
        if(Object.keys(oldState.channel.members).length <= 0){
          console.log("Deleting old private afk channel (gd-afk)");
          oldState.channel.delete().catch(console.error);
        }
      }
    }
    
    if (newState.channelId == guild.afkChannelId) {
      console.log("New afk (gd-afk)");
      var afkMember = await guild.members.fetch(newState.id);
      console.log("Afk name: "+ afkMember.user.username +" (gd-afk)");
      if(afkMember._roles.includes("911500333115637791")){
        console.log("Back it to call (gd-afk)");
        await delay(1000);
        var oldChannel = null;
        try{oldChannel = await guild.channels.cache.get(oldState.channel.id);}catch(e){}
        if(oldChannel && oldChannel.deleted == false){
          console.log("OldChannel ok! (gd-afk)");
          if(!afkMember.nickname){
            try{await afkMember.setNickname(afkMember.user.username + " " + afkTag);}catch(e){}
          }else{
            if(!afkMember.nickname.endsWith(afkTag)){
              try{await afkMember.setNickname(afkMember.nickname + " " + afkTag);}catch(e){}
            }
          }
            
          timer[afkMember.user.id] = Date.now();
          await afkMember.voice.setChannel(oldChannel);
        }else{
          console.log("Deleted channel or null oldChannel (gd-afk)");
          privateAfk();
        }
      }else{
        privateAfk();
      }
    }

    function privateAfk(){
      try{
      const everyone = guild.roles.everyone;
        guild.afkChannel.permissionOverwrites.edit(everyone, { 'CONNECT': false }, 'Locking the private afk channel').then(channel => {
            channel.setName(names[Math.floor((Math.random()*names.length))]).then(channel => {
              console.log("New private afk channel has been created (gd-afk)");
            }).catch(console.error);
          }).catch(console.error);
        guild.afkChannel.clone({name: "(🔽) 🚯┆Lixeiras - AFK"}).then(channel => {
          channel.setPosition(0);
          channel.permissionOverwrites.edit(everyone, { 'CONNECT': true }, 'Unlocking the afk channel').then(channel => {
            guild.setAFKChannel(channel, "New private afk channel for user").then(channel => {
              console.log("New afk channel has been set (gd-afk)");
            }).catch(console.error);
          }).catch(console.error);
        }).catch(console.error);
      }catch(e){console.log(e), " (gd-afk)"}
    }
  }catch(e){console.log(e), " (gd-afk)"}
}

module.exports = {
    afk: afk,
    afkCheck: afkCheck,
    afkTyping: afkTyping,
    afkNewState: afkNewState
};