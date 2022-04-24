// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { Client, Invite, TextChannel } from 'discord.js'
import { loadData, saveData } from './data'

function deleteInvite (client: Client, invite: Invite, reason: string) {
  console.log('Deleting invite:', invite.channel.name, invite.code, '(invites)')
  invite.delete().catch()
  if (!reason) return
  const channel = client.channels.cache.get('913590205485821992')
  if (!(channel instanceof TextChannel)) return console.log('Error channel not found! (invites)')
  channel.send({ content: reason }).then(replyMessage => { setTimeout(() => replyMessage.delete(), 30000) }).catch()
}

export async function checkAllInvites (client: Client, guildId: string, dataFile: string): Promise<void> {
  async function checkAll (client: Client, guildId: string, dataFile: string): Promise<void> {
    try {
      console.log('Checking all invites! (invites)')
      const guild = client.guilds.cache.get(guildId)
      if (!guild) return console.log('Guild not found! (invites)')
      const invites = await guild.invites.fetch().catch(console.error)
      if (!invites) return console.log('Error fetching invites! (invites)')
      invites.forEach(invite => {
        inviteVerifyServer(invite, client, guildId, dataFile)
      })
    } catch (e) { console.log(e) }
  }

  checkAll(client, guildId, dataFile)
  setInterval(function () { checkAll(client, guildId, dataFile) }, 60000 * 0.5)
}

async function inviteVerifyServer (invite: Invite, client: Client, guildId: string, dataFile: string): Promise<void> {
  // console.log("Checking invite:",invite.channel.name, invite.code,"(invites)")
  if (!invite) return console.log('Error invite not found! (invites)')
  if (invite.channel.id !== '913590205485821992') return
  if (!invite.uses || (invite.uses > 1)) return deleteInvite(client, invite, '')
  if (!invite.inviter) return console.log('Error invite.inviter not found! (invites)')
  if (invite.maxUses === 1) return deleteInvite(client, invite, `Atenção <@!${invite.inviter.id}>! O seu convite foi deletado.\nPor favor crie um convite com o máximo de usos **MAIOR** que **1** para que o BOT funcione corretamente!`)
  if (invite.expiresTimestamp === 0) return deleteInvite(client, invite, `Atenção <@!${invite.inviter.id}>! O seu convite foi deletado.\nPor medidas de segurança os convites pré-aprovados devem ter uma data de expiração definida! Tente criar um novo convite definido uma data de validade!`)

  const guild = client.guilds.cache.get(guildId)
  if (!guild) return console.log('Guild not found! (invites)')
  const oldInvites = await guild.invites.fetch({ channelId: '913590205485821992' })
  let updateInvite = null
  oldInvites.some(oldInvite => {
    if (oldInvite.code === invite.code) return false
    if (!oldInvite.inviter) return false
    if (!invite.inviter) return false
    if (oldInvite.inviter.id !== invite.inviter.id) return false
    if (!oldInvite.createdTimestamp) return false
    if (!invite.createdTimestamp) return false
    if (oldInvite.createdTimestamp >= invite.createdTimestamp) return false

    updateInvite = oldInvite
    return true
  })

  if (updateInvite) return deleteInvite(client, updateInvite, '')
}

export async function inviteChecker (invite: Invite, client: Client, guildId: string, dataFile: string): Promise<void> {
  if (!invite.guild) return console.log('Error invite.guild not found! (invites)')
  if (invite.guild.id !== guildId) return
  console.log('Checking invite:', invite.channel.name, invite.code, '(invites)')
  if (invite.channel.id !== '913590205485821992') return
  if (!invite.uses) return console.log('Error invite.uses not found! (invites)')
  if (invite.uses > 1) return deleteInvite(client, invite, '')

  const guild = client.guilds.cache.get(guildId)
  if (!guild) return console.log('Guild not found! (invites)')
  const oldInvites = await guild.invites.fetch({ channelId: '913590205485821992' })
  let updateInvite = null
  oldInvites.some(oldInvite => {
    if (oldInvite.code === invite.code) return false
    if (!oldInvite.inviter) return false
    if (!invite.inviter) return false
    if (oldInvite.inviter.id !== invite.inviter.id) return false
    if (!oldInvite.createdTimestamp) return false
    if (!invite.createdTimestamp) return false
    if (oldInvite.createdTimestamp >= invite.createdTimestamp) return false

    updateInvite = oldInvite
    return true
  })
  if (!invite.inviter) return console.log('Error invite.inviter not found! (invites)')
  if (updateInvite && (invite.maxUses === 1)) return deleteInvite(client, invite, `Atenção <@!${invite.inviter.id}>! O seu convite não pode ser atualizado pois o mesmo deve possuir o máximo de usos **MAIOR** que **1** para que o BOT funcione corretamente! Tente atualiza-lo novamente agora com o máximo de usos correto!`)
  if (updateInvite && (invite.expiresTimestamp === 0)) return deleteInvite(client, invite, `Atenção <@!${invite.inviter.id}>! O seu convite não pode ser atualizado pois por medidas de segurança os convites pré-aprovados devem ter uma data de expiração definida! Tente atualiza-lo novamente definido uma data de validade!`)
  if (updateInvite) return deleteInvite(client, updateInvite, `Atenção <@!${invite.inviter.id}>! O seu convite foi atualizado.\nParece que você atualizou o seu convite pré-aprovado!\n\nCaso você tenha tentado criar um novo, devo avisa-lo que apenas o ultimo convite gerado é valido pois só é permitido um convite pré-aprovado ativo por membro! (Não se preocupe a atualização de convites não gasta pontos do seu score!)`)

  if (invite.maxUses === 1) return deleteInvite(client, invite, `Atenção <@!${invite.inviter.id}>! O seu convite foi deletado.\nPor favor crie um convite com o máximo de usos **MAIOR** que **1** para que o BOT funcione corretamente!`)
  if (invite.expiresTimestamp === 0) return deleteInvite(client, invite, `Atenção <@!${invite.inviter.id}>! O seu convite foi deletado.\nPor medidas de segurança os convites pré-aprovados devem ter uma data de expiração definida! Tente criar um novo convite definido uma data de validade!`)

  const data = loadData(dataFile)
  if (!invite.inviter) return console.log('Error invite.inviter not found! (invites)')
  if ((data.memberList[invite.inviter.id].points < 3) || (data.memberList[invite.inviter.id].pointsMax < 3)) return deleteInvite(client, invite, `Atenção <@!${invite.inviter.id}>! Infelizmente você não possui score suficiente para criar um convite pré-aprovado! Por favor utilize um convite normal do servidor e quando seu convidado entrar autorize ele no canal <#899835574343589890>! Caso queira, temos um convite padrão disponível no canal <#721654860512231475>.`)

  // Updating inviter data
  if (invite.inviter.id !== process.env.ownerId) {
    data.memberList[invite.inviter.id].points = data.memberList[invite.inviter.id].points - 1
    saveData(dataFile, data)
  }
  console.log('New invite pre-authorized created (invites)')

  const channel = client.channels.cache.get('913590205485821992')
  if (!(channel instanceof TextChannel)) return console.log('Channel is not a TextChannel (invites)')
  channel.send({ content: `Parabéns <@!${invite.inviter.id}>! O seu convite pré-aprovado foi criado com sucesso usando pontos do seu score do GD! Lembrando que esses pontos são atualizados diariamente!` }).then(replyMessage => { setTimeout(() => replyMessage.delete(), 30000) }).catch()
}

export async function inviteDeleted (invite: Invite, client: Client, guildId: string, dataFile: string): Promise<void> {
  if (!invite.guild) return console.log('Error invite.guild not found! (invites)')
  if (invite.guild.id !== guildId) return
  console.log(invite)
  /* console.log('Checking deleted invite:', invite.channel.name, invite.code, '(invites)')
  if (invite.channel.id !== '913590205485821992') return
  if (invite.uses > 0) return
  const data = loadData(dataFile)
  if (data.memberList[invite.inviter.id].points >= data.memberList[invite.inviter.id].pointsMax) return
  data.memberList[invite.inviter.id].points = data.memberList[invite.inviter.id].points + 1
  console.log('Return points to inviter, unused invitation:', invite.inviter.user, invite.code, '(invites)')
  saveData(dataFile, data) */
}
