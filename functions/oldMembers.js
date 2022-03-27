// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

const { saveData } = require('./data')

function deleteFromList (dataFile, data, guildId, client) {
  const guild = client.guilds.cache.get(guildId)
  const list = Object.keys(data.memberList)
  const allMembers = []
  guild.members.cache.each(member => {
    allMembers.push(member.id)
  })
  for (const i in list) {
    if (!allMembers.includes(list[i])) {
      console.log(data.memberList[list[i]])
      if (data.memberList[list[i]].msgId) {
        const channel = guild.channels.cache.get(process.env.mainChannel)
        try { channel.fetchMessage(data.memberList[list[i]].msgId).then(msg => msg.delete()) } catch {}
      }
      delete data.memberList[list[i]]
      console.log('Deleting old member from data (oldMember)')
      saveData(dataFile, data)
    }
  }
}

module.exports = {
  deleteFromList: deleteFromList
}
