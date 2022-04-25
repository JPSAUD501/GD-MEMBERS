// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { Client, GuildVoiceChannelResolvable, Typing, VoiceChannel, VoiceState } from 'discord.js'
import { names } from './afkNames'

const afkTag = '[AFK]'
const timer: {
  [key: string]: number
} = {}
let firstCheck = true

async function afkCheckProcess (client: Client, guildId: string): Promise<void> {
  try {
    console.log('AFKs: (gd-afk)')
    console.log(timer)
    if ((Object.keys(timer).length <= 0) && firstCheck === true) {
      console.log('First afkCheck (gd-afk)')
      firstCheck = false
      const guild = client.guilds.cache.get(guildId)
      if (!guild) return console.log('Guild not found! (gd-afk)')
      guild.members.cache.each(member => {
        if (!member.nickname) return
        if (member.nickname.endsWith(afkTag)) {
          let nick = member.nickname.replace(afkTag, '')
          if (nick.length <= 0) nick = ''
          try { member.setNickname(nick) } catch (e) {}
        }
      })
    } else {
      const guild = client.guilds.cache.get(guildId)
      if (!guild) return console.log('Guild not found! (gd-afk)')
      for (const i in timer) {
        if (!i) return
        if ((timer[i] + (60000 * 5) + (60000 * 0.5)) <= Date.now()) {
          console.log('No longer afk - Time (gd-afk)')
          delete timer[i]
          guild.members.fetch(i).then(member => {
            if (!member.nickname) return
            if (member.nickname.endsWith(afkTag)) {
              let nick = member.nickname.replace(afkTag, '')
              if (nick.length <= 0) nick = ''
              try { member.setNickname(nick) } catch (e) {}
            }
          })
        }
      }
    }
  } catch (e) { console.log(e, ' (gd-afk)') }
}

export async function afkCheck (client: Client, guildId: string): Promise<void> {
  afkCheckProcess(client, guildId)
  setInterval(function (): void { afkCheckProcess(client, guildId) }, 60000 * 0.5)
}

export async function afkTyping (typing: Typing, client: Client, guildId: string): Promise<void> {
  try {
    for (const i in timer) {
      if (!i) return
      const typingMember = typing.member
      if (!typingMember) return console.log('typingMember not found! (gd-afk)')
      if (i === typingMember.user.id) {
        console.log('No longer afk - Typing (gd-afk)')
        delete timer[i]
        if (!typing.member.nickname) return
        if (typing.member.nickname.endsWith(afkTag)) {
          let nick = typing.member.nickname.replace(afkTag, '')
          if (nick.length <= 0) nick = ''
          try { typing.member.setNickname(nick) } catch (e) {}
        }
      }
    }
  } catch (e) { console.log(e, '(gd-afk)') }
}

export async function afkNewState (oldState: VoiceState, newState: VoiceState, client: Client, guildId: string): Promise<void> {
  try {
    if (!oldState.channel) { /* empty */ } else if (oldState.channel.parentId === '771255883543216171') return
    if (!newState.channel) { /* empty */ } else if (newState.channel.parentId === '771255883543216171') return

    for (const i in timer) {
      if (!i) return
      if (i === newState.id) {
        console.log('No longer afk - New State (gd-afk)')
        delete timer[i]
        const guild = client.guilds.cache.get(guildId)
        if (!guild) return console.log('Guild not found! (gd-afk)')
        const member = await guild.members.fetch(newState.id)
        if (!member.nickname) return
        if (member.nickname.endsWith(afkTag)) {
          let nick = member.nickname.replace(afkTag, '')
          if (nick.length <= 0) nick = ''
          try { member.setNickname(nick) } catch (e) {}
        }
      }
    }
  } catch (e) { console.log(e, '(gd-afk)') }
}

export async function afk (oldState: VoiceState, newState: VoiceState, client: Client, guildId: string): Promise<void> {
  try {
    if (oldState.guild.id !== guildId) return
    if (newState.guild.id !== guildId) return

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    const guild = client.guilds.cache.get(guildId)

    if (oldState.channel) {
      const oSCP = oldState.channel.parent
      if (!oSCP) return console.log('oSCP not found! (gd-afk)')
      if (oldState.channel.name.startsWith('🚯┆') && oSCP.id === '771255883543216171') {
        if (Object.keys(oldState.channel.members).length <= 0) {
          console.log('Deleting old private afk channel (gd-afk)')
          oldState.channel.delete().catch(console.error)
        }
      }
    }

    if (!guild) return console.log('Guild not found! (gd-afk)')
    if (newState.channelId === guild.afkChannelId) {
      console.log('New afk (gd-afk)')
      const afkMember = await guild.members.fetch(newState.id)
      console.log('Afk name: ' + afkMember.user.username + ' (gd-afk)')
      if (afkMember.roles.cache.has('911500333115637791')) {
        console.log('Back it to call (gd-afk)')
        await delay(1000)
        const oSC = oldState.channel
        if (!oSC) return privateAfk()
        let oldChannel = null
        try { oldChannel = guild.channels.cache.get(oSC.id) } catch (e) {}
        if (oldChannel) {
          console.log('OldChannel ok! (gd-afk)')
          if (!afkMember.nickname) {
            try { await afkMember.setNickname(afkMember.user.username + ' ' + afkTag) } catch (e) {}
          } else {
            if (!afkMember.nickname.endsWith(afkTag)) {
              try { await afkMember.setNickname(afkMember.nickname + ' ' + afkTag) } catch (e) {}
            }
          }

          timer[afkMember.user.id] = Date.now()
          await afkMember.voice.setChannel(oldChannel as GuildVoiceChannelResolvable)
        } else {
          console.log('Deleted channel or null oldChannel (gd-afk)')
          privateAfk()
        }
      } else {
        privateAfk()
      }
    }

    function privateAfk (): void {
      try {
        if (!guild) return console.log('Guild not found! (gd-afk)')
        const everyone = guild.roles.everyone
        const guildAfkChannel = guild.afkChannel
        if (!guildAfkChannel) return console.log('GuildAfkChannel not found! (gd-afk)')
        guildAfkChannel.permissionOverwrites.edit(everyone, { CONNECT: false }).then(channel => {
          channel.setName(names[Math.floor((Math.random() * names.length))]).then(channel => {
            console.log('New private afk channel has been created (gd-afk)')
          }).catch(console.error)
        }).catch(console.error)
        guildAfkChannel.clone({ name: '(🔽) 🚯┆Lixeiras - AFK' }).then(channel => {
          channel.setPosition(0)
          channel.permissionOverwrites.edit(everyone, { CONNECT: true }).then(channel => {
            if (!(channel instanceof VoiceChannel)) return console.log('Not a voice channel (gd-afk)')
            if (!guild) return console.log('Guild not found! (gd-afk)')
            guild.setAFKChannel(channel, 'New private afk channel for user').then(channel => {
              console.log('New afk channel has been set (gd-afk)')
            }).catch(console.error)
          }).catch(console.error)
        }).catch(console.error)
      } catch (e) { console.log(e, '(gd-afk)') }
    }
  } catch (e) { console.log(e, '(gd-afk)') }
}
