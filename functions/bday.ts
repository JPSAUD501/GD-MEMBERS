// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { loadData, saveData } from './data'
import { bdayMemberCard } from './cardMaker'
import moment, { locale } from 'moment'
import { Client } from 'discord.js'
import { IMemberData } from '../interfaces/interfaces'
locale('pt-br')

export async function bday (client: Client, guildId: string, dataFile: string, member: IMemberData): Promise<void> {
  try {
    const todayYear = moment(Date.now()).format('DD/MM/YYYY')
    const todayMonth = moment(Date.now()).format('DD/MM')
    if (member.birthday === todayMonth) {
      if (member.bot) return console.log('BOT (bday)')
      if (member.joinDate === todayYear) return console.log('Joined today (bDay)')
      if (member.lastBdayMsg === todayYear) return console.log('Message already sended (bday)')
      console.log('GD-VERSÁRIO de:', member.user)

      // Send message!
      const guild = client.guilds.cache.get(guildId)
      if (!guild) return console.log('Guild not found!')
      const data = loadData(dataFile)
      const memberData = data.memberList[member.id]
      if (!memberData) return console.log('Member not found (bday)')
      const cardImg = await bdayMemberCard(memberData)
      if (!(cardImg instanceof Buffer)) return console.log('Card is not a buffer (bday)')
      const bdayChannelId = process.env.channelBday
      if (!bdayChannelId) return console.log('Channel not found (bday)')
      const cardChannel = guild.channels.cache.get(bdayChannelId)
      if (!cardChannel) return console.log('Channel not found (bday)')
      if (!cardChannel.isText()) return console.log('Channel is not text (bday)')
      await cardChannel.send({
        content: `<@${member.id}>`,
        files: [{
          attachment: cardImg,
          name: 'card.png'
        }]
      }).catch()
      data.memberList[member.id].lastBdayMsg = todayYear
      data.memberList[member.id].lastBdayMsg = todayYear
      console.log('Adding message id to data (newMember)')
      saveData(dataFile, data)
    }
  } catch (err) {
    console.log(err)
  }
}
