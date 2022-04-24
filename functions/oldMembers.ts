// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { Client, TextChannel } from 'discord.js'
import { IData } from '../interfaces/interfaces'
import { saveData } from './data'

export function deleteFromList (dataFile: string, data: IData, guildId: string, client: Client) {
  const guild = client.guilds.cache.get(guildId)
  const list = Object.keys(data.memberList)
  const allMembers: string[] = []
  if (!guild) return console.log('Guild not found')
  guild.members.cache.each(member => {
    allMembers.push(member.id)
  })
  for (const i in list) {
    if (!allMembers.includes(list[i])) {
      console.log(data.memberList[list[i]])
      if (data.memberList[list[i]].msgId) {
        if (!process.env.mainChannel) return console.log('mainChannel not found')
        const channel = guild.channels.cache.get(process.env.mainChannel)
        if (!(channel instanceof TextChannel)) return console.log('Channel is not a text channel!')
        try { channel.messages.fetch(data.memberList[list[i]].msgId).then(msg => msg.delete()) } catch {}
      }
      delete data.memberList[list[i]]
      console.log('Deleting old member from data (oldMember)')
      saveData(dataFile, data)
    }
  }
}
