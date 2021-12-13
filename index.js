const keepAlive = require("./keepalive");
const {keepDataUpdated} = require("./functions/keepDataUpdated");
const {newMember, buttonClicked} = require("./functions/newMember");
const {timerFunctions, commands} = require("./functions/features");
const {inviteChecker, checkAllInvites, inviteDeleted} = require("./functions/invites");
const {afkCheck, afk, afkTyping, afkNewState} = require("./functions/gd-afk");
const {newPrivateGuildMember, oldPrivateGuildMember, privateGuildCommand} = require("./functions/privateGuilds");
const Discord = require("discord.js");
const veterantime = 2592000;
const fusotime = -10800000;
const botrelease = 1634452922000;
const guildid = "720275637415182416";
const datafile = "./site/data.json";
const prefix = "/";

keepAlive(datafile);

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



client.on("ready", () => {
  
  keepDataUpdated(client, fusotime, botrelease, guildid, datafile);
  timerFunctions(client, guildid, datafile, fusotime);
  afkCheck(client, guildid);
  checkAllInvites(client, guildid, datafile);

});

client.on("typingStart", typing => {

  afkTyping(typing, client, guildid);
  
});

client.on('guildMemberAdd', member => {

  newMember(client, guildid, member, datafile, fusotime, botrelease);

});

client.on('interactionCreate', interaction => {

  buttonClicked(client, interaction, datafile, guildid);

});

client.on('messageCreate', message => {

  commands(client, message, prefix, guildid, datafile);

});

client.on("voiceStateUpdate", (oldState, newState) => {

  afk(oldState, newState, client, guildid);
  afkNewState(oldState, newState, client, guildid);

});

client.on("inviteCreate", (invite) => {

  inviteChecker(invite, client, guildid, datafile);

});

client.on("inviteDelete", (invite) => {

  inviteDeleted(invite, client, guildid, datafile);

});

//-------------- GD-PRIVATE

client.on('guildMemberAdd', member => {

  newPrivateGuildMember(client, guildid, member);

});

client.on('guildMemberRemove', member => {

  oldPrivateGuildMember(client, guildid, member);

});

client.on('messageCreate', message => {

  privateGuildCommand(client, message, prefix, guildid);

});


client.on("error", () => { client.login(process.env['token']) });

client.login(process.env['token']);