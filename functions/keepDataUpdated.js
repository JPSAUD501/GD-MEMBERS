// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

const { loadData, saveData, updateMemberData } = require('./data')
const { bday } = require('./bday')
const { deleteFromList } = require('./oldMembers')
const moment = require('moment')
moment.locale('pt-br')

async function keepDataUpdated (client, botRelease, guildId, dataFile) {
  // saveData("./poi/poi.json", {"text": "Aguardando rodada..."});

  async function checkEveryMinute () {
    console.log('Checking!')
    let data = loadData(dataFile)
    const lastUpdate = moment(Date.now()).format('DD/MM/YYYY')
    console.log('Day: ' + lastUpdate)
    if (JSON.stringify(lastUpdate) !== JSON.stringify(data.lastUpdate)) {
      // New day! Checking everything and send messages!
      const guild = client.guilds.cache.get(guildId)
      let memberCounterNumber = 0
      guild.members.cache.each(member => {
        memberCounterNumber++
        console.log(memberCounterNumber, 'Members')
        updateMemberData(member, data, dataFile, botRelease, guildId, client, memberCounterNumber)
      })

      data = loadData(dataFile)

      const memberCounter = {
        membersNow: memberCounterNumber,
        membersInList: Object.keys(data.memberList).length
      }

      if (JSON.stringify(memberCounter) !== JSON.stringify(data.memberCounter)) {
        data.memberCounter = memberCounter
        console.log('Saving member counter (keepDataUpdated)')
        saveData(dataFile, data)
      }

      if (data.memberCounter.membersNow < data.memberCounter.membersInList) deleteFromList(dataFile, data, guildId, client)

      // Last update
      data.lastUpdate = lastUpdate
      data.lastUpdateUnix = Date.now()
      console.log('New day update! (keepDataUpdated)')
      saveData(dataFile, data)

      // Checking Bdays
      const list = Object.keys(data.memberList)
      for (const i in list) {
        if (!i) return
        await bday(client, guildId, dataFile, data.memberList[list[i]])
      }

      // BKP data.json
      client.channels.cache.get(process.env.channelBkp).send({ content: `BKP - ${moment(Date.now()).format('DD/MM/YYYY')}`, files: ['./' + dataFile] })
    }
  }

  checkEveryMinute()
  setInterval(function () { checkEveryMinute() }, 60000)
}

module.exports = {
  keepDataUpdated: keepDataUpdated
}
