const keepAlive = require("./keepalive");
const {keepDataUpdated} = require("./functions/keepDataUpdated");
const Discord = require("discord.js");
const veterantime = 2592000;
const fusotime = -10800000;
const botrelease = 1634688000;
const guildid = "720275637415182416";
const datafile = "./data.json";

keepAlive();

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

keepDataUpdated(client, veterantime, fusotime, botrelease, guildid, datafile)
//verificateMessages(client, )
//waitMessagesReacts(client, )

});



client.login(process.env['token']);