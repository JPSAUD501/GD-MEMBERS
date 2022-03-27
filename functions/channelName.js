// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

const timer = {}

async function channelName (oldState, newState, client, guildId) {
  // console.log(oldState, newState);
  console.log('channelName function called')
  if (!newState.channel) return
  console.log('channelName function newState exists')
  if (!oldState.channel) {
    // empty
  } else if (oldState.channel.id === newState.channel.id) return
  console.log('channelName function oldState != newState')
  const member = await client.guilds.cache.get(guildId).members.fetch(newState.id)
  if (member.user.bot) return
  console.log('channelName function !newState.member.user.bot')
  if (newState.channel.id !== '945401380078776340') return
  console.log('channelName function channelID == 945401380078776340')
  const channel = await newState.guild.channels.cache.get(newState.channel.id)
  console.log('Channel Name changed in private guild (privateGuilds)')
  if (!timer) {
    timer.now = Date.now()
  } else if (Date.now() - timer.now < 360000) return
  console.log('Channel Name changed OK in private guild (privateGuilds)')
  timer.now = Date.now()
  await channel.setName(`💚┊Por um BR sem: ${'*'.repeat(member.user.username.toString().length)}`).catch()
}

module.exports = {
  channelName: channelName
}
