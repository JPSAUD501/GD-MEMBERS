// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { Client, GuildMember, Message, MessageEmbed, PartialGuildMember, TextChannel } from 'discord.js'
import axios from 'axios'

export async function newPrivateGuildMember (client: Client, guildId: string, member: GuildMember) {
  if (member.guild.id === guildId) return
  const guild = client.guilds.cache.get(guildId)
  const joinedMember = await member.guild.members.fetch(member.id).catch()
  if (!joinedMember || !joinedMember.roles) {
    await member.send('Você precisa ser um membro autorizado do Grupo Disparate para poder entrar em um servidor privado. Para isso acesse o link a seguir e peça para quem te convidou para o servidor privado autorizar seu pedido para se tornar membro no Grupo Disparate!\nhttps://discord.gg/dvHU2rupA2')
    const embed = new MessageEmbed()
      .setTitle(`O usuário ${member.user.username} tentou entrar no servidor porem não era um membro do GD!`)
      .setColor('#E74C3C')
      .setThumbnail(member.user.displayAvatarURL())
      .setDescription(`Acabei de enviar o link de convite do servidor para ${member.user}, assim que alguém autorizar a entrada do mesmo no GD ele poderá se tornar um membro desse servidor privado!`)
      .addField('Link de convite do GD:', 'https://discord.gg/dvHU2rupA2', true)
      .addField('Link do canal de autorizações do GD:', 'https://discord.com/channels/720275637415182416/899835574343589890', true)
    const mainChatChannel = member.guild.channels.cache.find(channel => channel.name === '🌎┆geral-privado')
    if (!(mainChatChannel instanceof TextChannel)) return console.log('Channel is not a text channel! (newPrivateGuildMember)')
    if (!guild) return console.log('Guild not found (newPrivateGuildMember)')
    await mainChatChannel.send({ content: `${guild.roles.everyone}`, embeds: [embed] }).catch(console.error)
    member.kick().catch(console.error)
    console.log('Member joined DENIED in private guild (privateGuilds)')
  } else if (!joinedMember.roles.cache.has('721660842176806965')) {
    await member.send('Você precisa ser um membro autorizado do Grupo Disparate para poder entrar em um servidor privado. Para isso acesse o link a seguir e peça para quem te convidou para o servidor privado autorizar seu pedido para se tornar membro no Grupo Disparate!\nhttps://discord.gg/dvHU2rupA2')
    const embed = new MessageEmbed()
      .setTitle(`O usuário ${member.user.username} tentou entrar no servidor porem não era um membro autorizado do GD!`)
      .setColor('#E74C3C')
      .setThumbnail(member.user.displayAvatarURL())
      .setDescription(`Acabei de enviar o link de convite do servidor para ${member.user}, assim que alguém autorizar a entrada do mesmo no GD ele poderá se tornar um membro desse servidor privado!`)
      .addField('Link de convite do GD:', 'https://discord.gg/dvHU2rupA2', true)
      .addField('Link do canal de autorizações do GD:', 'https://discord.com/channels/720275637415182416/899835574343589890', true)
    const mainChatChannel = member.guild.channels.cache.find(channel => channel.name === '🌎┆geral-privado')
    if (!(mainChatChannel instanceof TextChannel)) return console.log('Channel is not a text channel! (newPrivateGuildMember)')
    if (!guild) return console.log('Guild not found (newPrivateGuildMember)')
    await mainChatChannel.send({ content: `${guild.roles.everyone}`, embeds: [embed] }).catch(console.error)
    member.kick().catch(console.error)
    console.log('Member joined DENIED in private guild (privateGuilds)')
  } else {
    console.log('Member joined OK in private guild (privateGuilds)')
    if (member.user.id === process.env.ownerId) {
      const ownerRolePrivate = member.guild.roles.cache.find(role => role.name === '『PRIMEIRO-MINISTRO』')
      if (!ownerRolePrivate) return console.log('Owner role not found (newPrivateGuildMember)')
      await member.roles.add(ownerRolePrivate).catch(console.error)
    }
    const memberRolePrivate = member.guild.roles.cache.find(role => role.name === '『MEMBRO』')
    if (!memberRolePrivate) return console.log('Member role not found (newPrivateGuildMember)')
    await member.roles.add(memberRolePrivate).catch(console.error)

    const embed = new MessageEmbed()
      .setTitle(`O usuário ${member.user.username} acabou de entrar neste servidor privado!`)
      .setColor('#2ECC71')
      .setThumbnail(member.user.displayAvatarURL())
      .setDescription(`Bem vindo ${member.user}!`)
    const mainChatChannel = member.guild.channels.cache.find(channel => channel.name === '🌎┆geral-privado')
    if (!(mainChatChannel instanceof TextChannel)) return console.log('Channel is not a text channel! (newPrivateGuildMember)')
    if (!guild) return console.log('Guild not found (newPrivateGuildMember)')
    await mainChatChannel.send({ content: `${guild.roles.everyone}`, embeds: [embed] }).catch(console.error)
  }
}

export async function oldPrivateGuildMember (client: Client, guildId: string, member: GuildMember | PartialGuildMember) {
  if (member.guild.id === guildId) return
  const guild = client.guilds.cache.get(guildId)
  console.log('Member exited OK in private guild (privateGuilds)')
  if (!member.joinedTimestamp) return console.log('Member joinedTimestamp not found (oldPrivateGuildMember)')
  if ((Date.now() - member.joinedTimestamp) <= 5000) return
  const embed = new MessageEmbed()
    .setTitle(`O membro ${member.user.username} acabou de sair deste servidor privado!`)
    .setColor('#FFA500')
    .setThumbnail(member.user.displayAvatarURL())
    .setDescription(`Até mais ${member.user}!`)
  const mainChatChannel = member.guild.channels.cache.find(channel => channel.name === '🌎┆geral-privado')
  if (!(mainChatChannel instanceof TextChannel)) return console.log('Channel is not a text channel! (oldPrivateGuildMember)')
  if (!guild) return console.log('Guild not found (oldPrivateGuildMember)')
  await mainChatChannel.send({ content: `${guild.roles.everyone}`, embeds: [embed] }).catch(console.error)
}

export async function privateGuildCommand (message: Message, guildId: string) {
  if (message.guildId === guildId) return

  let msg = message.content.split(' ')
  msg = msg.filter((a) => a)

  if (msg[0] === '/youtube' || msg[0] === '/yt') {
    console.log('YT Command in private guild (privateGuilds)')
    if (!message.member) return console.log('Member not found (privateGuildCommand)')
    const channel = message.member.voice.channel
    if (!channel || channel.type !== 'GUILD_VOICE') return await message.reply('Entre no canal de voz desse servidor privado para poder iniciar o Open Together Tube.')
    try {
      const tokenOTT = await axios.get('https://opentogethertube.com/api/auth/grant')
      const configOTT = {
        headers: { Authorization: `Bearer ${tokenOTT.data.token}` }
      }
      const bodyParametersOTT = {
        key: 'value'
      }
      const responseOTT = await axios.post('https://opentogethertube.com/api/room/generate', bodyParametersOTT, configOTT)
      const roomOTTLink = `https://ottr.cc/${responseOTT.data.room}`

      await message.reply({
        embeds: [new MessageEmbed()
          .setThumbnail('https://raw.githubusercontent.com/JPSAUD501/FILES/master/gd2022-didiei.png')
          .setTitle('Use esse link para iniciar uma sessão do OpenTogetherTube:\n' + `${roomOTTLink}`)
          .setFooter({ text: 'By GD-DIDIEI' })
          .setColor('#FF0000')
        ]
      })
    } catch (err) {
      console.log(err)
      message.reply('Ocorreu um erro ao tentar iniciar o Open Together Tube. Tente novamente mais tarde.')
    }
  }
}
