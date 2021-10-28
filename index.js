const keepAlive = require("./keepalive");
const {keepDataUpdated} = require("./functions/keepDataUpdated");
const {newMember, buttonClicked} = require("./functions/newMember");
const {callName} = require("./functions/features");
const {commands} = require("./functions/features");
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
  callName(client, guildid, datafile, fusotime);

});



client.on('guildMemberAdd', member => {

  newMember(client, guildid, member, datafile, fusotime, botrelease);

});



client.on('interactionCreate', interaction => {

  buttonClicked(client, interaction, datafile, guildid);

});

client.on('messageCreate', message => {

  commands(client, message, prefix, guildid);

});

client.on("error", () => { client.login(process.env['token']) });

client.login(process.env['token']);