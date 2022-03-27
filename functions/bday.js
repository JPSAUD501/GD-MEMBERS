// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

const { loadData, saveData } = require('./data')
const { bdayMemberCard } = require('./cardMaker')
const moment = require('moment')
moment.locale('pt-br')

async function bday (client, guildId, dataFile, member) {
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
      const data = loadData(dataFile)
      const memberData = data.memberList[member.id]
      if (!memberData) return console.log('Member not found (bday)')
      const cardImg = await bdayMemberCard(guildId, memberData)
      const bdayChannelId = process.env.channelBday
      const cardChannel = guild.channels.cache.get(bdayChannelId)
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

module.exports = {
  bday: bday
}
