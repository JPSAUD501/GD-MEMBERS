// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { Client, VoiceState } from 'discord.js'

const timer: {
  now?: number
} = {}

export async function channelName (oldState: VoiceState, newState: VoiceState, client: Client, guildId: string): Promise<void> {
  // console.log(oldState, newState);
  console.log('channelName function called')
  if (!newState.channel) return
  console.log('channelName function newState exists')
  if (!oldState.channel) {
    // empty
  } else if (oldState.channel.id === newState.channel.id) return
  console.log('channelName function oldState != newState')
  const guild = client.guilds.cache.get(guildId)
  if (!guild) return console.log('Guild not found! (channelName)')
  const member = await guild.members.fetch(newState.id)
  if (member.user.bot) return
  console.log('channelName function !newState.member.user.bot')
  if (newState.channel.id !== '945401380078776340') return
  console.log('channelName function channelID == 945401380078776340')
  const channel = await newState.guild.channels.cache.get(newState.channel.id)
  if (!channel) return console.log('Channel not found! (channelName)')
  console.log('Channel Name changed in private guild (privateGuilds)')
  if (!timer.now) {
    timer.now = Date.now()
  } else if (Date.now() - timer.now < 360000) return
  console.log('Channel Name changed OK in private guild (privateGuilds)')
  timer.now = Date.now()
  await channel.setName(`💚┊Por um BR sem: ${'*'.repeat(member.user.username.toString().length)}`).catch()
}
