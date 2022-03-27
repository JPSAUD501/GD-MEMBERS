// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

const allEmojis = require('./emojis').allEmojis
const { loadData, memberLevel } = require('./data')
const { newMemberCard, bdayMemberCard } = require('./cardMaker')
const { birthday } = require('./moment')
const emojiRegex = require('emoji-regex')
const regex = emojiRegex()
const randomColor = require('randomcolor')
const timer = []
const timerRole = []
const roleDelay = 0.5

const roleLvl = '909711622640115742'
const roleDivMain = '909710113907023893'
const roleStaff = '909713172653543454'
const roleInsignia = '909711093537079346'

function getRandom (list) {
  return list[Math.floor((Math.random() * list.length))]
}

function cFL (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

async function timerFunctions (client, guildId, dataFile) {
  function everyMinute () {
    try {
      const data = loadData(dataFile)
      const guild = client.guilds.cache.get(guildId)
      guild.channels.cache.forEach(channel => {
        if (channel.parentId !== '720275637415182420') return
        if (!channel.name.includes('┊')) return
        channel.members.forEach(member => {
          if (memberLevel(member) < 30) return
          if (data.memberList[member.user.id].birthday === birthday(Date.now())) {
            const gdvCallName = '🎊┊' + member.user.username
            if (channel.name === gdvCallName) return
            if (channel.name.includes('🎊')) return
            console.log('GD-Versariante or new member present in the voice channel (features)')
            channel.setName('🎊┊' + member.user.username)
          }
        })
      })
    } catch (e) { console.log(e) }
  }

  function every15Minutes () {
    try {
      const guild = client.guilds.cache.get(guildId)
      guild.members.fetch().then(members => {
        members.forEach(member => {
          try {
            member.presence.activities.forEach(function (activity) {
              if (activity.applicationId === '700136079562375258') {
                // VALORANT
                // console.log(m.user.username, "---", activity);
              }
              if (activity.applicationId === '401518684763586560') {
                // LoL
                // console.log(m.user.username, "---", activity);
              }
              if (activity.applicationId === '821361671729709086') {
                // BlueStacks 5
                // console.log(m.user.username, "---", activity);
              }
            })
          } catch (e) {}
        })
      }).catch(console.error)
    } catch (e) { console.log(e) }
  }

  async function privateServer () {
    try {
      const pGuildsIds = client.guilds.cache.map(guild => guild.id)
      console.log('Guilds:', pGuildsIds, '(features)')
      for (const i in pGuildsIds) {
        async function privates () {
          if (pGuildsIds[i] === guildId) return
          if (pGuildsIds[i] === '720275637415182416') return
          console.log('Private guild:', pGuildsIds[i], '(features)')
          const pGuild = await client.guilds.cache.get(pGuildsIds[i])
          if (pGuild.ownerId !== client.user.id) return
          const membersInVoicePrivateGuild = []
          pGuild.channels.cache.forEach(channel => {
            if (channel.type !== 'GUILD_VOICE') {
              if (channel.type !== 'GUILD_STAGE_VOICE') return
            }
            channel.members.forEach(member => {
              membersInVoicePrivateGuild.push(member.user.id)
            })
          })
          let howManyMembersInCall = 0
          membersInVoicePrivateGuild.map(() => howManyMembersInCall++)
          if (howManyMembersInCall === 0) {
            console.log(pGuild.createdTimestamp)
            if (pGuild.createdTimestamp + 300000 >= Date.now()) return
            if (pGuild.id === '720275637415182416') return
            if (pGuild.id !== guildId) {
              pGuild.delete().then(console.log('Private Guild deleted! (features)'))
            }
          }
        }
        await privates()
      }
    } catch (e) { console.log(e) }
  }

  function memberCounter () {
    try {
      const guild = client.guilds.cache.get(guildId)
      const memberRole = guild.roles.cache.get('721660842176806965')
      const counter = memberRole.members.size
      console.log('Updating channel topic: ' + counter + ' (features)')
      let counterEmoji = counter.toString()
      counterEmoji = counterEmoji.replace(/0/gi, '0️⃣')
      counterEmoji = counterEmoji.replace(/1/gi, '1️⃣')
      counterEmoji = counterEmoji.replace(/2/gi, '2️⃣')
      counterEmoji = counterEmoji.replace(/3/gi, '3️⃣')
      counterEmoji = counterEmoji.replace(/4/gi, '4️⃣')
      counterEmoji = counterEmoji.replace(/5/gi, '5️⃣')
      counterEmoji = counterEmoji.replace(/6/gi, '6️⃣')
      counterEmoji = counterEmoji.replace(/7/gi, '7️⃣')
      counterEmoji = counterEmoji.replace(/8/gi, '8️⃣')
      counterEmoji = counterEmoji.replace(/9/gi, '9️⃣')
      const channel = client.channels.cache.get('720275637860040784')
      channel.setTopic(`Chat geral! Contador de membros: ${counterEmoji}`).catch(console.error)
    } catch (e) { console.log(e) }
  }

  function divRoles () {
    try {
      console.log('Updating divRoles (features)')
      const guild = client.guilds.cache.get(guildId)
      guild.members.fetch().then(members => {
        members.forEach(member => {
          try {
            const m = member

            m._roles.forEach(roleId => {
              const role = guild.roles.cache.get(roleId)
              if (role.name.includes('✮')) {
                if (!m._roles.includes(roleLvl)) {
                  if (timerRole.role && (((Date.now() - timerRole.role) / 1000) < roleDelay)) {
                    return
                  } else {
                    console.log(m.user.username, 'Giving role Lvl (features)')
                    m.roles.add(guild.roles.cache.get(roleLvl))
                    timerRole.role = Date.now()
                  }
                }
              }
              if (role.name.includes('『')) {
                if (!m._roles.includes(roleDivMain)) {
                  if (timerRole.role && (((Date.now() - timerRole.role) / 1000) < roleDelay)) {
                    return
                  } else {
                    console.log(m.user.username, 'Giving role DivMain (features)')
                    m.roles.add(guild.roles.cache.get(roleDivMain))
                    timerRole.role = Date.now()
                  }
                }
              }
              if (role.name.includes('🏳')) {
                if (!m._roles.includes(roleStaff)) {
                  if (timerRole.role && (((Date.now() - timerRole.role) / 1000) < roleDelay)) {
                    return
                  } else {
                    console.log(m.user.username, 'Giving role Staff (features)')
                    m.roles.add(guild.roles.cache.get(roleStaff))
                    timerRole.role = Date.now()
                  }
                }
              }
              if (role.name.includes('🎖')) {
                if (!m._roles.includes(roleInsignia)) {
                  if (timerRole.role && (((Date.now() - timerRole.role) / 1000) < roleDelay)) {
                    // empty
                  } else {
                    console.log(m.user.username, 'Giving role Insignia (features)')
                    m.roles.add(guild.roles.cache.get(roleInsignia))
                    timerRole.role = Date.now()
                  }
                }
              }
            })

            m._roles.forEach(roleId => {
              let includesRole = 0
              if (roleId === roleLvl) {
                includesRole = 0
                m._roles.forEach(roleId => {
                  const role = guild.roles.cache.get(roleId)
                  if (role.name.includes('✮')) {
                    includesRole += 1
                  }
                })
                if (includesRole === 0) {
                  console.log(m.user.username, 'Removing role Lvl (features)')
                  m.roles.remove(guild.roles.cache.get(roleLvl))
                }
              }
              if (roleId === roleDivMain) {
                includesRole = 0
                m._roles.forEach(roleId => {
                  const role = guild.roles.cache.get(roleId)
                  if (role.name.includes('『')) {
                    includesRole += 1
                  }
                })
                if (includesRole === 0) {
                  console.log(m.user.username, 'Removing role DivMain (features)')
                  m.roles.remove(guild.roles.cache.get(roleDivMain))
                }
              }
              if (roleId === roleStaff) {
                includesRole = 0
                m._roles.forEach(roleId => {
                  const role = guild.roles.cache.get(roleId)
                  if (role.name.includes('🏳')) {
                    includesRole += 1
                  }
                })
                if (includesRole === 0) {
                  console.log(m.user.username, 'Removing role Staff (features)')
                  m.roles.remove(guild.roles.cache.get(roleStaff))
                }
              }
              if (roleId === roleInsignia) {
                includesRole = 0
                m._roles.forEach(roleId => {
                  const role = guild.roles.cache.get(roleId)
                  if (role.name.includes('🎖')) {
                    includesRole += 1
                  }
                })
                if (includesRole === 0) {
                  console.log(m.user.username, 'Removing role Insignia (features)')
                  m.roles.remove(guild.roles.cache.get(roleInsignia))
                }
              }
            })
          } catch (e) { console.log(e) }
        })
      }).catch(console.error)
    } catch (e) { console.log(e) }
  }

  function specialEvents () {
    const timeNowFuso = Date.now()
    const startWithFuso = 0 // Start Event
    const endWithFuso = 0 // End Event
    const roleEventId = 'id'
    const eventName = '"Evento by GD"'
    console.log('Special events check (features) (Now:', timeNowFuso, ')')
    if (timeNowFuso < (startWithFuso)) return
    if (timeNowFuso > (endWithFuso)) return
    console.log('Event running... (features)')
    const guild = client.guilds.cache.get(guildId)
    guild.channels.cache.forEach(channel => {
      if (channel.parentId === '771255883543216171') return
      if (channel.type !== 'GUILD_VOICE') return
      channel.members.forEach(member => {
        if (member.user.bot === true) return
        if (!member._roles.includes('721660842176806965')) return

        // Change parameters per event
        if (member._roles.includes(roleEventId)) return
        console.log(member.user.username, '- Still eligible (features)')
        member.roles.add(guild.roles.cache.get(roleEventId)).then(member => {
          client.channels.cache.get('919484652736094218').send({ content: `O membro **"${member.user.username}" - ${member.user}** participou do evento **${eventName}** e recebeu com sucesso o emblema <@&${roleEventId}>!` }).catch(console.error)
        }).catch(console.error)
      })
    })
  }

  everyMinute()
  every15Minutes()
  memberCounter()
  divRoles()
  privateServer()
  specialEvents()
  setInterval(function () { everyMinute() }, 60000 * 1)
  setInterval(function () { every15Minutes() }, 60000 * 15)
  setInterval(async function () { privateServer() }, 60000 * 5)
  setInterval(function () { memberCounter() }, 60000 * 10)
  setInterval(function () { divRoles() }, 60000 * 0.5)
  setInterval(function () { specialEvents() }, 60000 * 0.5)
}

async function commands (client, message, prefix, guildId, dataFile) {
  try {
    let msg = message.content.split(' ')
    msg = msg.filter((a) => a)

    if (msg[0] === '/callname' || msg[0] === '/renomear' || msg[0] === '/rename') {
    // Check channel
      if (message.channel.id !== '771257420470157322') return

      console.log('New command! (features)')
      console.log(msg)
      const guild = client.guilds.cache.get(guildId)
      guild.members.fetch(message.author.id).then(user => {
        if (memberLevel(user) < 50) return message.reply({ content: 'Para usar esse comando você precisa ser LvL 50 aqui no servidor. Para saber como verificar seu nível leia o canal <#768686751291408424>.' }).catch(console.error)
        const vChannel = message.member.voice.channel
        if (!vChannel) return message.reply({ content: 'Entre em um canal para poder trocar o nome dele!' }).catch(console.error)
        if (vChannel.parentId !== '720275637415182420') return message.reply({ content: 'Entre em um canal válido para renomeá-lo!' }).catch(console.error)
        if (!vChannel.name.includes('┊')) return message.reply({ content: 'Entre em um canal válido para renomeá-lo!' }).catch(console.error)
        if (!msg[1]) return message.reply({ content: 'Para trocar o nome do canal de voz mande **/callname (emoji) (nome)**. ' }).catch(console.error)
        if (timer[vChannel.id] && (((Date.now() - timer[vChannel.id]) / 1000) <= 300)) return message.reply({ content: 'O Discord só permite a troca do nome do canal a cada 5 minutos. Tente renomear outro canal de voz ou aguarde e tente novamente em **' + parseInt(300 - ((Date.now() - timer[vChannel.id]) / 1000)) + ' segundos** para poder alterar o nome desse!' }).catch(console.error)

        // Emoji and text
        let match = msg[1].match(regex)
        let text = ''
        if (!match) {
          match = getRandom(allEmojis).match(regex)
          text = msg
          text.shift()
        } else {
          text = msg
          text.shift()
          text.shift()
        }
        const emojiArray = match[0]
        const emoji = [...emojiArray][0]

        // Text
        text = text.join(' ')
        if (text.lenth > 10) return message.reply({ content: 'O campo de nome não pode ter mais de 15 caracteres. Para usar esse comando mande **/callname (emoji) (nome)**.' }).catch(console.error)

        // Name
        const name = emoji + '┊' + text
        console.log(name)
        message.reply({ content: `Trocando o nome do canal para: **${name}**\n\nSe em até 10 segundos o nome não mudar tente novamente daqui 5 minutos devido as limitações do Discord.` }).catch(console.error)
        vChannel.setName(name).then(() => {
          console.log('New name in voice channel (features)')
          timer[vChannel.id] = Date.now()
          message.reply({ content: 'Pronto! O canal foi renomeado com sucesso!' }).catch()
        }).catch(console.error)
      })
    }

    if (msg[0] === '/crole' || msg[0] === '/cr' || msg[0] === '/createrole' || msg[0] === '/creater') {
      if (message.channel.id !== '771257420470157322' && message.channel.id !== '721647931433811998') return
      if (message.author.id !== process.env.ownerId) return message.reply({ content: 'Apenas um administrador do BOT pode usar esse comando.' }).catch(console.error)

      const guild = client.guilds.cache.get(guildId)

      const args = msg
      args.shift()

      let memberGiftedId = null

      if (!args[0]) return message.reply({ content: 'Forneça um nome para o novo emblema. Ex: /createrole lindo-emblema' }).catch(console.error)

      if (args[0].startsWith('<@!')) {
        memberGiftedId = args[0].replace('<@!', '').replace('>', '')
        args.shift()
      }

      let name = cFL(args.join(' '))
      name = '🎖' + name

      const position = guild.roles.cache.get(roleInsignia).position

      console.log(name, position, 'created! (features)')

      guild.roles.create({
        name: name,
        color: randomColor({ luminosity: 'bright' }),
        position: position,
        reason: 'Create a insignia role!'
      }).then(role => {
        message.reply({ content: `Criado com sucesso o emblema <@&${role.id}>` }).catch(console.error)
        if (memberGiftedId !== null) {
          guild.members.fetch(memberGiftedId).then(member => {
            member.roles.add(role).then(function () {
              message.reply({ content: `O novo emblema <@&${role.id}> foi fornecido à <@${memberGiftedId}>` }).catch(console.error)
            }).catch(console.error)
          }).catch(console.error)
        }
      }).catch(console.error)
    }

    if (msg[0] === 'a/m' && msg[1] === 'stats') {
      if (message.channel.id !== '771257420470157322') return
      try {
        const data = loadData(dataFile)
        if (!data.memberList[message.author.id]) return message.reply({ content: 'Não consegui carregar os seus pontos no servidor, tente novamente mais tarde!.' }).catch(console.error)
        let points = data.memberList[message.author.id].points
        points = points * Math.pow(Math.PI, 2.25)
        message.reply({ content: `O seu score atual no servidor é **${Math.round(points)}**\nLembrando que esse valor é gerado automaticamente com base no seu nível no servidor principalmente.!\nO seu score é usado para autorizar novos membros ou gerar convites pré-aprovados, dessa forma se você realizou alguma dessas ações recentemente seu score provavelmente não está no máximo.` }).catch(console.error)
      } catch (e) { console.log(e) }
    }

    if (msg[0] === '/private') {
      if (message.channel.id !== '771257420470157322') return
      const guild = client.guilds.cache.get(guildId)
      const user = await guild.members.fetch(message.author.id).catch(console.error)
      if (!user) return message.reply({ content: 'Ocorreu um erro durante a execução do comando solicitado! Contate um moderador ou tente novamente mais tarde.' }).catch(console.error)
      if (memberLevel(user) < 40) return message.reply({ content: 'Para usar esse comando você precisa ser LvL 40 aqui no servidor. Para saber como verificar seu nível leia o canal <#768686751291408424>.' }).catch(console.error)
      console.log(`Creating new private server for ${message.author.username} (features)`)
      try {
        const createdGuild = await client.guilds.create('GD-PRIVATE', {
          channels: [
            { name: '🌎┆geral-privado' }
          ]
        })
        await createdGuild.roles.everyone.edit({
          permissions: []
        }).catch(console.error)
        await createdGuild.roles.create({
          name: '『PRIMEIRO-MINISTRO』',
          color: '#F1C40F',
          hoist: true,
          permissions: ['ADMINISTRATOR'],
          reason: 'Create a insignia role!'
        }).catch(console.error)
        await createdGuild.roles.create({
          name: '『MEMBRO』',
          color: '#BCC0C0',
          hoist: true,
          permissions: ['VIEW_CHANNEL', 'STREAM', 'ADD_REACTIONS', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'CONNECT', 'SPEAK', 'USE_VAD', 'CHANGE_NICKNAME', 'USE_APPLICATION_COMMANDS', 'USE_EXTERNAL_STICKERS', 'SEND_MESSAGES_IN_THREADS', 'START_EMBEDDED_ACTIVITIES'],
          reason: 'Create a insignia role!'
        }).catch(console.error)
        await createdGuild.setIcon('./GD-PRIVATE.png')
        const createdGuildChannel = createdGuild.channels.cache.find(channel => channel.name === '🌎┆geral-privado')
        const createdGuildInvite = await createdGuildChannel.createInvite({ maxAge: 0, unique: true, reason: '' }).catch(console.error)
        await createdGuildChannel.send({ content: `${createdGuild.roles.everyone}\n**LINK DE CONVITE DESTE SERVIDOR PRIVADO CRIADO POR ${message.author.username.toUpperCase()}: ${createdGuildInvite.url}**` }).catch(console.error)
        message.reply('Sem problemas! Acabei de enviar para você o link de convite de um servidor ultra secreto do GD! Esse servidor é temporário, ou seja, será deletado em até 5 minutos caso ninguém esteja em um canal de voz dele.\nAlguns avisos:\n- Apenas membros autorizados do GD podem entrar no servidor privado.\n- Sempre que alguém entrar no servidor privado uma mensagem no canal "🌎┆geral-privado" será enviada para avisar!\n- Esse link é a única forma de entrar no servidor secreto, ele foi enviado apenas para você e para os moderadores do GD.')
        await client.channels.cache.get('919484652736094218').send({ content: `O membro **"${message.author.username}" - ${message.author}** acabou de criar um servidor privado! Esse link de convite está sendo enviado para esse canal **apenas para fins de moderação**, por favor use apenas caso seja necessário!\n${createdGuildInvite.url}` }).catch(console.error)
        await message.author.send(`Link de convite do servidor privado: ${createdGuildInvite.url}`)
        createdGuild.channels.create('🦚┆covil-do-shrek', { type: 'GUILD_VOICE' })
      } catch (e) { console.log(e) }
    }

    if (msg[0] === '/card1') {
      if (message.channel.id !== '857811346048286720') return
      const guild = client.guilds.cache.get(guildId)
      const member = await guild.members.fetch(message.author.id).catch(console.error)
      if (!member) return message.reply({ content: 'Ocorreu um erro durante a execução do comando solicitado! Contate um moderador ou tente novamente mais tarde.' }).catch(console.error)
      const cardImg = await newMemberCard(guildId, member)
      await message.reply({
        files: [{
          attachment: cardImg,
          name: 'card.png'
        }]
      }).catch()
    }
    if (msg[0] === '/card2') {
      if (message.channel.id !== '857811346048286720') return
      const guild = client.guilds.cache.get(guildId)
      const member = await guild.members.fetch(message.author.id).catch(console.error)
      if (!member) return message.reply({ content: 'Ocorreu um erro durante a execução do comando solicitado! Contate um moderador ou tente novamente mais tarde.' }).catch(console.error)
      const data = loadData(dataFile)
      const memberData = data.memberList[member.id]
      if (!memberData) return message.reply({ content: 'Ocorreu um erro durante a execução do comando solicitado! Contate um moderador ou tente novamente mais tarde.' }).catch(console.error)
      const cardImg = await bdayMemberCard(guildId, memberData)
      await message.reply({
        files: [{
          attachment: cardImg,
          name: 'card.png'
        }]
      }).catch()
    }
  } catch (e) { console.log(e) }
}

module.exports = {
  timerFunctions: timerFunctions,
  commands: commands
}
