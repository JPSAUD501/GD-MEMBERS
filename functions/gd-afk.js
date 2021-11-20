const names = require("./afkNames").names;

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

function afk(oldState, newState, client, guildid){
  try{
    const guild = client.guilds.cache.get(guildid);
    if(oldState.channel){
      if (oldState.channel.name.startsWith("🚯┆") && oldState.channel.parent.id == "771255883543216171"){
        if(Object.keys(oldState.channel.members).length <= 0){
          console.log("Deleting old private afk channel (gd-afk)");
          oldState.channel.delete();
        }
      }
    }
    
    if (newState.channelId == guild.afkChannelId) {
      console.log("New afk (gd-afk)");
      const everyone = guild.roles.everyone;
      guild.afkChannel.permissionOverwrites.edit(everyone, { 'CONNECT': false }, 'Locking the private afk channel').then(channel => {
          channel.setName(names.random()).then(channel => {
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
    }
  }catch(e){console.log(e), "(gd-afk)"}
}

module.exports = {
    afk: afk
};