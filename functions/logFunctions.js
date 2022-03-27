// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

const { newMemberCard } = require('./cardMaker')

async function memberExitedLog (client, guildId, member) {
  if (member.guild.id !== guildId) return
  if (member.user.bot) return
  const guild = client.guilds.cache.get(guildId)
  const logChannelId = process.env.eventsChannel
  const logChannel = guild.channels.cache.get(logChannelId)
  await logChannel.send(`O membro **"${member.user.username}" - "${member.user.toString()}"** acabou de sair do servidor.`).catch()
};

async function memberJoinedLog (client, guildId, member) {
  try {
    if (member.guild.id !== guildId) return
    if (member.user.bot) return
    const guild = client.guilds.cache.get(guildId)
    const logChannelId = process.env.eventsChannel
    const logChannel = guild.channels.cache.get(logChannelId)
    await logChannel.send(`O membro **"${member.user.username}" - "${member.user.toString()}"** acabou de entrar no servidor.`).catch()
    const cardImg = await newMemberCard(guildId, member)
    const cardChannelId = process.env.historyChannel
    const cardChannel = guild.channels.cache.get(cardChannelId)
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
};

module.exports = {
  memberExitedLog: memberExitedLog,
  memberJoinedLog: memberJoinedLog
}
