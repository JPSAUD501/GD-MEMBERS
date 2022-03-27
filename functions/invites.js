// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

const { loadData, saveData } = require('./data')

function deleteInvite (client, invite, reason) {
  console.log('Deleting invite:', invite.channel.name, invite.code, '(invites)')
  invite.delete().catch()
  if (!reason) return
  client.channels.cache.get('913590205485821992').send({ content: reason }).then(replyMessage => { setTimeout(() => replyMessage.delete(), 30000) }).catch()
}

async function checkAllInvites (client, guildId, dataFile) {
  async function checkAll (client, guildId, dataFile) {
    try {
      console.log('Checking all invites! (invites)')
      const guild = await client.guilds.cache.get(guildId)
      const invites = await guild.invites.fetch().catch(console.error)
      invites.forEach(invite => {
        inviteVerifyServer(invite, client, guildId, dataFile)
      })
    } catch (e) { console.log(e) }
  }

  checkAll(client, guildId, dataFile)
  setInterval(function () { checkAll(client, guildId, dataFile) }, 60000 * 0.5)
}

async function inviteVerifyServer (invite, client, guildId, dataFile) {
  // console.log("Checking invite:",invite.channel.name, invite.code,"(invites)")
  if (invite.channel.id !== '913590205485821992') return
  if (invite.uses > 1) return deleteInvite(client, invite)
  if (invite.maxUses === 1) return deleteInvite(client, invite, `Atenção <@!${invite.inviter.id}>! O seu convite foi deletado.\nPor favor crie um convite com o máximo de usos **MAIOR** que **1** para que o BOT funcione corretamente!`)
  if (invite.expiresTimestamp === 0) return deleteInvite(client, invite, `Atenção <@!${invite.inviter.id}>! O seu convite foi deletado.\nPor medidas de segurança os convites pré-aprovados devem ter uma data de expiração definida! Tente criar um novo convite definido uma data de validade!`)

  const guild = await client.guilds.cache.get(guildId)
  const oldInvites = await guild.invites.fetch({ channelId: '913590205485821992' })
  let updateInvite = null
  oldInvites.some(oldInvite => {
    if (oldInvite.code === invite.code) return false
    if (oldInvite.inviter.id !== invite.inviter.id) return false
    if (oldInvite.createdTimestamp >= invite.createdTimestamp) return false

    updateInvite = oldInvite
    return true
  })

  if (updateInvite) return deleteInvite(client, updateInvite)
}

async function inviteChecker (invite, client, guildId, dataFile) {
  if (invite.guild.id !== guildId) return
  console.log('Checking invite:', invite.channel.name, invite.code, '(invites)')
  if (invite.channel.id !== '913590205485821992') return
  if (invite.uses > 1) return deleteInvite(client, invite)

  const guild = await client.guilds.cache.get(guildId)
  const oldInvites = await guild.invites.fetch({ channelId: '913590205485821992' })
  let updateInvite = null
  oldInvites.some(oldInvite => {
    if (oldInvite.code === invite.code) return false
    if (oldInvite.inviter.id !== invite.inviter.id) return false
    if (oldInvite.createdTimestamp >= invite.createdTimestamp) return false

    updateInvite = oldInvite
    return true
  })
  if (updateInvite && (invite.maxUses === 1)) return deleteInvite(client, invite, `Atenção <@!${invite.inviter.id}>! O seu convite não pode ser atualizado pois o mesmo deve possuir o máximo de usos **MAIOR** que **1** para que o BOT funcione corretamente! Tente atualiza-lo novamente agora com o máximo de usos correto!`)
  if (updateInvite && (invite.expiresTimestamp === 0)) return deleteInvite(client, invite, `Atenção <@!${invite.inviter.id}>! O seu convite não pode ser atualizado pois por medidas de segurança os convites pré-aprovados devem ter uma data de expiração definida! Tente atualiza-lo novamente definido uma data de validade!`)
  if (updateInvite) return deleteInvite(client, updateInvite, `Atenção <@!${invite.inviter.id}>! O seu convite foi atualizado.\nParece que você atualizou o seu convite pré-aprovado!\n\nCaso você tenha tentado criar um novo, devo avisa-lo que apenas o ultimo convite gerado é valido pois só é permitido um convite pré-aprovado ativo por membro! (Não se preocupe a atualização de convites não gasta pontos do seu score!)`)

  if (invite.maxUses === 1) return deleteInvite(client, invite, `Atenção <@!${invite.inviter.id}>! O seu convite foi deletado.\nPor favor crie um convite com o máximo de usos **MAIOR** que **1** para que o BOT funcione corretamente!`)
  if (invite.expiresTimestamp === 0) return deleteInvite(client, invite, `Atenção <@!${invite.inviter.id}>! O seu convite foi deletado.\nPor medidas de segurança os convites pré-aprovados devem ter uma data de expiração definida! Tente criar um novo convite definido uma data de validade!`)

  const data = loadData(dataFile)
  if ((data.memberList[invite.inviter.id].points < 3) || (data.memberList[invite.inviter.id].pointsMax < 3)) return deleteInvite(client, invite, `Atenção <@!${invite.inviter.id}>! Infelizmente você não possui score suficiente para criar um convite pré-aprovado! Por favor utilize um convite normal do servidor e quando seu convidado entrar autorize ele no canal <#899835574343589890>! Caso queira, temos um convite padrão disponível no canal <#721654860512231475>.`)

  // Updating inviter data
  if (invite.inviter.id !== process.env.ownerId) {
    data.memberList[invite.inviter.id].points = data.memberList[invite.inviter.id].points - 1
    saveData(dataFile, data)
  }
  console.log('New invite pre-authorized created (invites)')

  client.channels.cache.get('913590205485821992').send({ content: `Parabéns <@!${invite.inviter.id}>! O seu convite pré-aprovado foi criado com sucesso usando pontos do seu score do GD! Lembrando que esses pontos são atualizados diariamente!` }).then(replyMessage => { setTimeout(() => replyMessage.delete(), 30000) }).catch()
}

async function inviteDeleted (invite, client, guildId, dataFile) {
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

module.exports = {
  inviteChecker: inviteChecker,
  checkAllInvites: checkAllInvites,
  inviteDeleted: inviteDeleted
}
