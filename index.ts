// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { keepDataUpdated } from './functions/keepDataUpdated'
import { newMember, buttonClicked } from './functions/newMember'
import { timerFunctions, commands } from './functions/features'
import { inviteChecker, checkAllInvites, inviteDeleted } from './functions/invites'
import { afkCheck, afk, afkTyping, afkNewState } from './functions/gd-afk'
import { newPrivateGuildMember, oldPrivateGuildMember, privateGuildCommand } from './functions/privateGuilds'
import { channelName } from './functions/channelName'
import { memberExitedLog, memberJoinedLog } from './functions/logFunctions'
import Discord from 'discord.js'
import dotenv from 'dotenv'
const botRelease = 1634452922000
const guildId = '720275637415182416'
const dataFile = './data.json'

dotenv.config()

const client = new Discord.Client({
  restTimeOffset: 0,
  shards: 'auto',
  restWsBridgeTimeout: 100,
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
  commands(client, message, guildId, dataFile)
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
  privateGuildCommand(message, guildId)
})

client.on('error', () => { client.login(process.env.token) })

client.login(process.env.token)
