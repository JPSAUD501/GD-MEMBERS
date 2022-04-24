// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { Client, GuildMember, PartialGuildMember, TextChannel } from 'discord.js'
import { newMemberCard } from './cardMaker'

export async function memberExitedLog (client: Client, guildId: string, member: GuildMember | PartialGuildMember) {
  if (member.guild.id !== guildId) return
  if (member.user.bot) return
  const guild = client.guilds.cache.get(guildId)
  if (!guild) return console.log('Guild not found! (memberExitedLog)')
  const logChannelId = process.env.eventsChannel
  if (!logChannelId) return console.log('No log channel found! (memberExitedLog)')
  const logChannel = guild.channels.cache.get(logChannelId)
  if (!(logChannel instanceof TextChannel)) return console.log('Channel is not a text channel! (memberExitedLog)')
  await logChannel.send(`O membro **"${member.user.username}" - "${member.user.toString()}"** acabou de sair do servidor.`).catch()
};

export async function memberJoinedLog (client: Client, guildId: string, member: GuildMember) {
  try {
    if (member.guild.id !== guildId) return
    if (member.user.bot) return
    const guild = client.guilds.cache.get(guildId)
    if (!guild) return console.log('Guild not found! (memberExitedLog)')
    const logChannelId = process.env.eventsChannel
    if (!logChannelId) return console.log('No log channel found! (memberExitedLog)')
    const logChannel = guild.channels.cache.get(logChannelId)
    if (!(logChannel instanceof TextChannel)) return console.log('Channel is not a text channel! (memberJoinedLog)')
    await logChannel.send(`O membro **"${member.user.username}" - "${member.user.toString()}"** acabou de entrar no servidor.`).catch()
    const cardImg = await newMemberCard(guildId, member)
    if (!(cardImg instanceof Buffer)) return console.log('Card is not a buffer! (memberJoinedLog)')
    const cardChannelId = process.env.historyChannel
    if (!cardChannelId) return console.log('No card channel found! (memberJoinedLog)')
    const cardChannel = guild.channels.cache.get(cardChannelId)
    if (!(cardChannel instanceof TextChannel)) return console.log('Channel is not a text channel! (memberJoinedLog)')
    await cardChannel.send({
      files: [{
        attachment: cardImg,
        name: 'card.png'
      }]
    }).catch()
    await logChannel.send(`O membro **${member.user.username} - "${member.user.toString()}"** acabou de receber com sucesso seu card do servidor.`).catch()
  } catch (err) {
    console.log(err)
  }
}
