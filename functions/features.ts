// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { allEmojis } from './emojis'
import { loadData, loadDataCustom, memberLevel, saveData } from './data'
import { newMemberCard, bdayMemberCard } from './cardMaker'
import { birthday } from './moment'
import emojiRegex from 'emoji-regex'
import randomColor from 'randomcolor'
import { Client, ColorResolvable, Message, TextChannel, ThreadMemberManager } from 'discord.js'
const regex = emojiRegex()
const timer: {
  [roleId: string]: number
} = {}
const timerRole: {
  [roleId: string]: number
} = {}
const roleDelay = 0.5

const roleLvlId = '909711622640115742'
const roleDivMainId = '909710113907023893'
const roleStaffId = '909713172653543454'
const roleInsigniaId = '909711093537079346'

function getRandom (list: string[]) {
  return list[Math.floor((Math.random() * list.length))]
}

function cFL (string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export async function timerFunctions (client: Client, guildId: string, dataFile: string) {
  function everyMinute (): void {
    try {
      const data = loadData(dataFile)
      const guild = client.guilds.cache.get(guildId)
      if (!guild) return console.log('Guild not found! (timerFunctions)')
      guild.channels.cache.forEach(channel => {
        if (channel.parentId !== '720275637415182420') return
        if (!channel.name.includes('┊')) return
        if (channel.members instanceof ThreadMemberManager) return
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

  // function every15Minutes () {
  //   try {
  //     const guild = client.guilds.cache.get(guildId)
  //     guild.members.fetch().then(members => {
  //       members.forEach(member => {
  //         try {
  //           member.presence.activities.forEach(function (activity) {
  //             if (activity.applicationId === '700136079562375258') {
  //               // VALORANT
  //               // console.log(m.user.username, "---", activity);
  //             }
  //             if (activity.applicationId === '401518684763586560') {
  //               // LoL
  //               // console.log(m.user.username, "---", activity);
  //             }
  //             if (activity.applicationId === '821361671729709086') {
  //               // BlueStacks 5
  //               // console.log(m.user.username, "---", activity);
  //             }
  //           })
  //         } catch (e) {}
  //       })
  //     }).catch(console.error)
  //   } catch (e) { console.log(e) }
  // }

  async function privateServer (): Promise<void> {
    try {
      const pGuildsIds = client.guilds.cache.map(guild => guild.id)
      console.log('Guilds:', pGuildsIds, '(features)')
      for (const i in pGuildsIds) {
        async function privates (): Promise<void> {
          if (pGuildsIds[i] === guildId) return
          if (pGuildsIds[i] === '720275637415182416') return
          console.log('Private guild:', pGuildsIds[i], '(features)')
          const pGuild = client.guilds.cache.get(pGuildsIds[i])
          if (!pGuild) return console.log('Guild not found! (features)')
          const clientUser = client.user
          if (!clientUser) return console.log('Client user not found! (features)')
          if (pGuild.ownerId !== clientUser.id) return
          const membersInVoicePrivateGuild: string[] = []
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
              await pGuild.delete().catch(console.error)
              console.log('Private Guild deleted! (features)')
            }
          }
        }
        await privates()
      }
    } catch (e) { console.log(e) }
  }

  function memberCounter (): void {
    try {
      const guild = client.guilds.cache.get(guildId)
      if (!guild) return console.log('Guild not found! (memberCounter)')
      const memberRole = guild.roles.cache.get('721660842176806965')
      if (!memberRole) return console.log('Member role not found! (memberCounter)')
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
      if (!(channel instanceof TextChannel)) return
      channel.setTopic(`Chat geral! Contador de membros: ${counterEmoji}`).catch(console.error)
    } catch (e) { console.log(e) }
  }

  function divRoles (): void {
    try {
      console.log('Updating divRoles (features)')
      const guild = client.guilds.cache.get(guildId)
      if (!guild) return console.log('Guild not found! (divRoles)')
      guild.members.fetch().then(members => {
        members.forEach(member => {
          try {
            const m = member

            m.roles.cache.forEach(role => {
              if (role.name.includes('✮')) {
                if (!m.roles.cache.has(roleLvlId)) {
                  if (timerRole[role.id] && (((Date.now() - timerRole[role.id]) / 1000) < roleDelay)) {
                    return
                  } else {
                    console.log(m.user.username, 'Giving role Lvl (features)')
                    const roleLvl = guild.roles.cache.get(roleLvlId)
                    if (!roleLvl) return console.log('Role not found! (features)')
                    m.roles.add(roleLvl)
                    timerRole[role.id] = Date.now()
                  }
                }
              }
              if (role.name.includes('『')) {
                if (!m.roles.cache.has(roleDivMainId)) {
                  if (timerRole[role.id] && (((Date.now() - timerRole[role.id]) / 1000) < roleDelay)) {
                    return
                  } else {
                    console.log(m.user.username, 'Giving role DivMain (features)')
                    const roleDivMain = guild.roles.cache.get(roleDivMainId)
                    if (!roleDivMain) return console.log('Role not found! (features)')
                    m.roles.add(roleDivMain)
                    timerRole[role.id] = Date.now()
                  }
                }
              }
              if (role.name.includes('🏳')) {
                if (!m.roles.cache.has(roleStaffId)) {
                  if (timerRole[role.id] && (((Date.now() - timerRole[role.id]) / 1000) < roleDelay)) {
                    return
                  } else {
                    console.log(m.user.username, 'Giving role Staff (features)')
                    const roleStaff = guild.roles.cache.get(roleStaffId)
                    if (!roleStaff) return console.log('Role not found! (features)')
                    m.roles.add(roleStaff)
                    timerRole[role.id] = Date.now()
                  }
                }
              }
              if (role.name.includes('🎖')) {
                if (!m.roles.cache.has(roleInsigniaId)) {
                  if (timerRole[role.id] && (((Date.now() - timerRole[role.id]) / 1000) < roleDelay)) {
                    // empty
                  } else {
                    console.log(m.user.username, 'Giving role Insignia (features)')
                    const roleInsignia = guild.roles.cache.get(roleInsigniaId)
                    if (!roleInsignia) return console.log('Role not found! (features)')
                    m.roles.add(roleInsignia)
                    timerRole[role.id] = Date.now()
                  }
                }
              }
            })

            m.roles.cache.forEach(role => {
              let includesRole = 0
              if (role.id === roleLvlId) {
                includesRole = 0
                m.roles.cache.forEach(role => {
                  if (role.name.includes('✮')) {
                    includesRole += 1
                  }
                })
                if (includesRole === 0) {
                  console.log(m.user.username, 'Removing role Lvl (features)')
                  const roleLvl = guild.roles.cache.get(roleLvlId)
                  if (!roleLvl) return console.log('Role not found! (features)')
                  m.roles.remove(roleLvl)
                }
              }
              if (role.id === roleDivMainId) {
                includesRole = 0
                m.roles.cache.forEach(role => {
                  if (role.name.includes('『')) {
                    includesRole += 1
                  }
                })
                if (includesRole === 0) {
                  console.log(m.user.username, 'Removing role DivMain (features)')
                  const roleDivMain = guild.roles.cache.get(roleDivMainId)
                  if (!(roleDivMain)) return console.log('Role not found! (features)')
                  m.roles.remove(roleDivMain)
                }
              }
              if (role.id === roleStaffId) {
                includesRole = 0
                m.roles.cache.forEach(role => {
                  if (role.name.includes('🏳')) {
                    includesRole += 1
                  }
                })
                if (includesRole === 0) {
                  console.log(m.user.username, 'Removing role Staff (features)')
                  const roleStaff = guild.roles.cache.get(roleStaffId)
                  if (!roleStaff) return console.log('Role not found! (features)')
                  m.roles.remove(roleStaff)
                }
              }
              if (role.id === roleInsigniaId) {
                includesRole = 0
                m.roles.cache.forEach(role => {
                  if (role.name.includes('🎖')) {
                    includesRole += 1
                  }
                })
                if (includesRole === 0) {
                  console.log(m.user.username, 'Removing role Insignia (features)')
                  const roleInsignia = guild.roles.cache.get(roleInsigniaId)
                  if (!roleInsignia) return console.log('Role not found! (features)')
                  m.roles.remove(roleInsignia)
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
    if (!guild) return console.log('Guild not found! (features)')
    guild.channels.cache.forEach(channel => {
      if (channel.parentId === '771255883543216171') return
      if (channel.type !== 'GUILD_VOICE') return
      channel.members.forEach(member => {
        if (member.user.bot === true) return
        if (!member.roles.cache.has('721660842176806965')) return

        // Change parameters per event
        if (member.roles.cache.has(roleEventId)) return
        console.log(member.user.username, '- Still eligible (features)')
        const roleEvent = guild.roles.cache.get(roleEventId)
        if (!roleEvent) return console.log('Role not found! (features)')
        member.roles.add(roleEvent).then(member => {
          const channel = client.channels.cache.get('919484652736094218')
          if (!(channel instanceof TextChannel)) return console.log('Channel is not a TextChannel (features)')
          channel.send({ content: `O membro **"${member.user.username}" - ${member.user}** participou do evento **${eventName}** e recebeu com sucesso o emblema <@&${roleEventId}>!` }).catch(console.error)
        }).catch(console.error)
      })
    })
  }

  everyMinute()
  memberCounter()
  divRoles()
  privateServer()
  specialEvents()
  setInterval(function (): void { everyMinute() }, 60000 * 1)
  setInterval(async function (): Promise<void> { privateServer() }, 60000 * 5)
  setInterval(function (): void { memberCounter() }, 60000 * 10)
  setInterval(function (): void { divRoles() }, 60000 * 0.5)
  setInterval(function (): void { specialEvents() }, 60000 * 0.5)
}

export async function commands (client: Client, message: Message, guildId: string, dataFile: string) {
  try {
    let msg = message.content.split(' ')
    msg = msg.filter((a) => a)

    if (msg[0] === '/callname' || msg[0] === '/renomear' || msg[0] === '/rename') {
    // Check channel
      if (message.channel.id !== '771257420470157322') return

      console.log('New command! (features)')
      console.log(msg)
      const guild = client.guilds.cache.get(guildId)
      if (!guild) return
      guild.members.fetch(message.author.id).then(user => {
        if (memberLevel(user) < 50) return message.reply({ content: 'Para usar esse comando você precisa ser LvL 50 aqui no servidor. Para saber como verificar seu nível leia o canal <#768686751291408424>.' }).catch(console.error)
        const messageMember = message.member
        if (!messageMember) return message.reply({ content: 'Ocorreu um erro. Tente novamente.' }).catch(console.error)
        const vChannel = messageMember.voice.channel
        if (!vChannel) return message.reply({ content: 'Entre em um canal para poder trocar o nome dele!' }).catch(console.error)
        if (vChannel.parentId !== '720275637415182420') return message.reply({ content: 'Entre em um canal válido para renomeá-lo!' }).catch(console.error)
        if (!vChannel.name.includes('┊')) return message.reply({ content: 'Entre em um canal válido para renomeá-lo!' }).catch(console.error)
        if (!msg[1]) return message.reply({ content: 'Para trocar o nome do canal de voz mande **/callname (emoji) (nome)**. ' }).catch(console.error)
        if (timer[vChannel.id] && (((Date.now() - timer[vChannel.id]) / 1000) <= 300)) return message.reply({ content: 'O Discord só permite a troca do nome do canal a cada 5 minutos. Tente renomear outro canal de voz ou aguarde e tente novamente em **' + parseInt((300 - ((Date.now() - timer[vChannel.id]) / 1000)).toString()) + ' segundos** para poder alterar o nome desse!' }).catch(console.error)

        // Emoji and text
        let match = msg[1].match(regex)
        console.log(match)
        if (!match) return message.reply({ content: 'O emoji que você escolheu não é válido. Tente novamente.' }).catch(console.error)
        let textArray: string[] = []
        if (!match) {
          match = getRandom(allEmojis).match(regex)
          textArray = msg
          textArray.shift()
        } else {
          textArray = msg
          textArray.shift()
          textArray.shift()
        }
        if (!match) return message.reply({ content: 'O emoji que você escolheu não é válido. Tente novamente.' }).catch(console.error)
        const emojiArray = match[0]
        const emoji = [...emojiArray][0]

        // Text
        const textString = textArray.join(' ')
        if (textString.length > 12) return message.reply({ content: 'O campo de nome não pode ter mais de 12 caracteres. Para usar esse comando mande **/callname (emoji) (nome)**.' }).catch(console.error)

        // Name
        const name = emoji + '┊' + textString
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
      if (!guild) return console.log('Guild not found! (features)')

      const args = msg
      args.shift()

      let memberGiftedId = ''

      if (!args[0]) return message.reply({ content: 'Forneça um nome para o novo emblema. Ex: /createrole lindo-emblema' }).catch(console.error)

      if (args[0].startsWith('<@!')) {
        memberGiftedId = args[0].replace('<@!', '').replace('>', '')
        args.shift()
      }

      let name = cFL(args.join(' '))
      name = '🎖' + name

      const roleInsignia = guild.roles.cache.get(roleInsigniaId)
      if (!roleInsignia) return message.reply({ content: 'Ocorreu um erro. Tente novamente.' }).catch(console.error)
      const position = roleInsignia.position

      console.log(name, position, 'created! (features)')

      guild.roles.create({
        name,
        color: randomColor({ luminosity: 'bright' }) as ColorResolvable,
        position,
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
      if (!guild) return console.log('Guild not found! (features)')
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
        if (!(createdGuildChannel instanceof TextChannel)) return console.log('Error creating private server! createdGuildChannel is not a TextChannel (features.ts)')
        const createdGuildInvite = await createdGuildChannel.createInvite({ maxAge: 0, unique: true, reason: '' }).catch(console.error)
        if (!createdGuildInvite) return console.log('Error creating private server! createdGuildInvite is null (features.ts)')
        await createdGuildChannel.send({ content: `${createdGuild.roles.everyone}\n**LINK DE CONVITE DESTE SERVIDOR PRIVADO CRIADO POR ${message.author.username.toUpperCase()}: ${createdGuildInvite.url}**` }).catch(console.error)
        message.reply('Sem problemas! Acabei de enviar para você o link de convite de um servidor ultra secreto do GD! Esse servidor é temporário, ou seja, será deletado em até 5 minutos caso ninguém esteja em um canal de voz dele.\nAlguns avisos:\n- Apenas membros autorizados do GD podem entrar no servidor privado.\n- Sempre que alguém entrar no servidor privado uma mensagem no canal "🌎┆geral-privado" será enviada para avisar!\n- Esse link é a única forma de entrar no servidor secreto, ele foi enviado apenas para você e para os moderadores do GD.')
        const channel = client.channels.cache.get('919484652736094218')
        if (!(channel instanceof TextChannel)) return console.log('Error creating private server! channel is not a TextChannel (features.ts)')
        channel.send({ content: `O membro **"${message.author.username}" - ${message.author}** acabou de criar um servidor privado! Esse link de convite está sendo enviado para esse canal **apenas para fins de moderação**, por favor use apenas caso seja necessário!\n${createdGuildInvite.url}` }).catch(console.error)
        await message.author.send(`Link de convite do servidor privado: ${createdGuildInvite.url}`)
        createdGuild.channels.create('🦚┆covil-do-shrek', { type: 'GUILD_VOICE' })
      } catch (e) { console.log(e) }
    }

    if (msg[0] === '/card1') {
      if (message.channel.id !== '857811346048286720') return
      const guild = client.guilds.cache.get(guildId)
      if (!guild) return console.log('Guild not found! (features)')
      const member = await guild.members.fetch(message.author.id).catch(console.error)
      if (!member) return message.reply({ content: 'Ocorreu um erro durante a execução do comando solicitado! Contate um moderador ou tente novamente mais tarde.' }).catch(console.error)
      const cardImg = await newMemberCard(guildId, member)
      if (!(cardImg instanceof Buffer)) return console.log('Error creating new member card! cardImg is not a Buffer ID: 1 (features.ts)')
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
      if (!guild) return console.log('Guild not found! (features)')
      const member = await guild.members.fetch(message.author.id).catch(console.error)
      if (!member) return message.reply({ content: 'Ocorreu um erro durante a execução do comando solicitado! Contate um moderador ou tente novamente mais tarde.' }).catch(console.error)
      const data = loadData(dataFile)
      const memberData = data.memberList[member.id]
      if (!memberData) return message.reply({ content: 'Ocorreu um erro durante a execução do comando solicitado! Contate um moderador ou tente novamente mais tarde.' }).catch(console.error)
      const cardImg = await bdayMemberCard(memberData)
      if (!(cardImg instanceof Buffer)) return console.log('Error creating new member card! cardImg is not a Buffer ID: 2 (features.ts)')
      await message.reply({
        files: [{
          attachment: cardImg,
          name: 'card.png'
        }]
      }).catch()
    }
    if (msg[0] === '/changeallnames') {
      if (!msg[1]) return message.reply({ content: 'Você precisa informar o nome! (Exemplo: `/changeallnames "Novo nome"`)' }).catch(console.error)
      msg.shift()
      const nick = msg.join(' ')
      const preData = loadDataCustom('nicknames.json')
      if (!preData) return message.reply({ content: 'Ocorreu um erro durante a execução do comando solicitado! Contate um moderador ou tente novamente mais tarde.' }).catch(console.error)
      if (preData.customName && (preData.customName !== '')) return message.reply({ content: 'Use antes o comando /backnames' }).catch(console.error)
      const guild = client.guilds.cache.get(guildId)
      if (!guild) return console.log('Guild not found! (features)')
      // Change all members nick to "go loud"
      const members = await guild.members.fetch()
      if (!members) return message.reply({ content: 'Ocorreu um erro durante a execução do comando solicitado! Contate um moderador ou tente novamente mais tarde.' }).catch(console.error)
      const ownerId = process.env.ownerId
      await message.reply({ content: 'Iniciando a alteração de nomes!' }).catch(console.error)
      for (const member of members.values()) {
        if (member.user.bot) continue
        if (member.id === ownerId) continue
        const nicknamesData = loadDataCustom('nicknames.json')
        if (!nicknamesData.nicknames) nicknamesData.nicknames = {}
        nicknamesData.nicknames[member.id] = member.nickname
        if (nicknamesData.nicknames[member.id] === null) nicknamesData.nicknames[member.id] = ''
        saveData('nicknames.json', nicknamesData)
        await member.setNickname(nick).catch(console.error)
      }
      await message.reply({ content: 'Todos os nomes foram alterados!' }).catch(console.error)
      const data = loadDataCustom('nicknames.json')
      data.time = Date.now()
      data.customName = nick
      saveData('nicknames.json', data)
    }
    if (msg[0] === '/backallnames') {
      const guild = client.guilds.cache.get(guildId)
      if (!guild) return console.log('Guild not found! (features)')
      const members = await guild.members.fetch()
      if (!members) return message.reply({ content: 'Ocorreu um erro durante a execução do comando solicitado! Contate um moderador ou tente novamente mais tarde.' }).catch(console.error)
      const ownerId = process.env.ownerId
      await message.reply({ content: 'Iniciando a restauração de nomes!' }).catch(console.error)
      for (const member of members.values()) {
        if (member.user.bot) continue
        if (member.id === ownerId) continue
        const nicknamesData = loadDataCustom('nicknames.json')
        if (!nicknamesData.nicknames[member.id] && nicknamesData.nicknames[member.id] !== null) continue
        await member.setNickname(nicknamesData.nicknames[member.id]).catch(console.error)
      }
      await message.reply({ content: 'Todos os nomes foram restaurados!' }).catch(console.error)
      const data = loadDataCustom('nicknames.json')
      data.time = Date.now()
      data.customName = ''
      saveData('nicknames.json', data)
    }
  } catch (e) { console.log(e) }
}
