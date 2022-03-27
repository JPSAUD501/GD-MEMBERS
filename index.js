// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

require('dotenv').config()
const { keepDataUpdated } = require('./functions/keepDataUpdated')
const { newMember, buttonClicked } = require('./functions/newMember')
const { timerFunctions, commands } = require('./functions/features')
const { inviteChecker, checkAllInvites, inviteDeleted } = require('./functions/invites')
const { afkCheck, afk, afkTyping, afkNewState } = require('./functions/gd-afk')
const { newPrivateGuildMember, oldPrivateGuildMember, privateGuildCommand } = require('./functions/privateGuilds')
const { channelName } = require('./functions/channelName')
const { memberExitedLog, memberJoinedLog } = require('./functions/logFunctions')
const Discord = require('discord.js')
const botRelease = 1634452922000
const guildId = '720275637415182416'
const dataFile = './data.json'
const prefix = '/'

const client = new Discord.Client({
  fetchAllMembers: true,
  restTimeOffset: 0,
  shards: 'auto',
  restWsBridgeTimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    'GUILDS',
    'GUILD_MEMBERS',
    'GUILD_BANS',
    'GUILD_INTEGRATIONS',
    'GUILD_WEBHOOKS',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_PRESENCES',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGE_TYPING',
    'DIRECT_MESSAGES',
    'DIRECT_MESSAGE_REACTIONS',
    'DIRECT_MESSAGE_TYPING'
  ]
})

client.on('ready', async () => {
  await keepDataUpdated(client, botRelease, guildId, dataFile)
  timerFunctions(client, guildId, dataFile)
  afkCheck(client, guildId)
  checkAllInvites(client, guildId, dataFile)
})

client.on('typingStart', async typing => {
  afkTyping(typing, client, guildId)
})

client.on('guildMemberAdd', async member => {
  newMember(client, guildId, member, dataFile, botRelease)
  memberJoinedLog(client, guildId, member)
})

client.on('guildMemberRemove', async member => {
  memberExitedLog(client, guildId, member)
})

client.on('interactionCreate', async interaction => {
  buttonClicked(client, interaction, dataFile, guildId)
})

client.on('messageCreate', async message => {
  commands(client, message, prefix, guildId, dataFile)
})

client.on('voiceStateUpdate', async (oldState, newState) => {
  afk(oldState, newState, client, guildId)
  afkNewState(oldState, newState, client, guildId)
  channelName(oldState, newState, client, guildId)
})

client.on('inviteCreate', async invite => {
  inviteChecker(invite, client, guildId, dataFile)
})

client.on('inviteDelete', async invite => {
  inviteDeleted(invite, client, guildId, dataFile)
})

// -------------- GD-PRIVATE

client.on('guildMemberAdd', async member => {
  newPrivateGuildMember(client, guildId, member)
})

client.on('guildMemberRemove', async member => {
  oldPrivateGuildMember(client, guildId, member)
})

client.on('messageCreate', async message => {
  privateGuildCommand(client, message, prefix, guildId)
})

client.on('error', () => { client.login(process.env.token) })

client.login(process.env.token)
