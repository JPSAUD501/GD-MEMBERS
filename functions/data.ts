// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { timeToString, birthday, daysToBday, age, sinceDays } from './moment'
import fs from 'fs'
import moment from 'moment'
import { IData, IMemberData } from '../interfaces/interfaces'
import { Client, GuildMember } from 'discord.js'
moment.locale('pt-br')

const lvl01 = '728073881725829182'
const lvl10 = '768683585581350932'
const lvl20 = '728072500801568853'
const lvl30 = '728076146046140486'
const lvl40 = '771066884136894484'
const lvl50 = '771067779742040134'
const lvl60 = '790490003116654602'
const lvl70 = '790491464584265798'
const lvl80 = '795537757564829716'
const lvl90 = '795537854415110174'
const lvl100 = '795538070707240992'
const lvl110 = '826153614581694504'
const lvl120 = '830948266672783381'
const lvl130 = '830948556885721148'
const lvl140 = '830948577793671228'
const lvl150 = '830948584152367104'
const lvl160 = '830948589168885800'
const lvl170 = '830948593241817088'
const lvl180 = '830948598510256159'
const lvl190 = '830948602649640990'
const lvl200 = '830948607061786674'

export function createFile (dataFile: string): void {
  fs.writeFileSync(('./' + dataFile), ('{}'))
}

export function loadData (dataFile: string): IData {
  if (!fs.existsSync('./' + (dataFile))) {
    console.log('Creating file!', dataFile)
    createFile(dataFile)
    const dataJson = JSON.parse(fs.readFileSync('./' + (dataFile), 'utf8'))
    saveData(dataFile, dataJson)
    const dataJson2 = JSON.parse(fs.readFileSync('./' + (dataFile), 'utf8'))
    return dataJson2 as IData
  } else {
    const dataJson = JSON.parse(fs.readFileSync('./' + (dataFile), 'utf8'))
    return dataJson as IData
  }
}

export function loadDataCustom (dataFile: string) {
  if (!fs.existsSync('./' + (dataFile))) {
    console.log('Creating file!', dataFile)
    createFile(dataFile)
    const dataJson = JSON.parse(fs.readFileSync('./' + (dataFile), 'utf8'))
    saveData(dataFile, dataJson)
    const dataJson2 = JSON.parse(fs.readFileSync('./' + (dataFile), 'utf8'))
    return dataJson2
  } else {
    const dataJson = JSON.parse(fs.readFileSync('./' + (dataFile), 'utf8'))
    return dataJson
  }
}

export function saveData (dataFile: string, data: IData): void {
  fs.writeFileSync('./' + (dataFile), JSON.stringify(data, null, 2))
  const dataVerify = loadData(dataFile)
  fs.writeFileSync('./' + (dataFile), JSON.stringify(dataVerify, null, 2))
  console.log('Saved!', dataFile)
}

export function memberLevel (member: GuildMember): number {
  if (member.user.id === process.env.ownerId) {
    return 200
  } else if (member.roles.cache.has(lvl01)) {
    return 1
  } else if (member.roles.cache.has(lvl10)) {
    return 10
  } else if (member.roles.cache.has(lvl20)) {
    return 20
  } else if (member.roles.cache.has(lvl30)) {
    return 30
  } else if (member.roles.cache.has(lvl40)) {
    return 40
  } else if (member.roles.cache.has(lvl50)) {
    return 50
  } else if (member.roles.cache.has(lvl60)) {
    return 60
  } else if (member.roles.cache.has(lvl70)) {
    return 70
  } else if (member.roles.cache.has(lvl80)) {
    return 80
  } else if (member.roles.cache.has(lvl90)) {
    return 90
  } else if (member.roles.cache.has(lvl100)) {
    return 100
  } else if (member.roles.cache.has(lvl110)) {
    return 110
  } else if (member.roles.cache.has(lvl120)) {
    return 120
  } else if (member.roles.cache.has(lvl130)) {
    return 130
  } else if (member.roles.cache.has(lvl140)) {
    return 140
  } else if (member.roles.cache.has(lvl150)) {
    return 150
  } else if (member.roles.cache.has(lvl160)) {
    return 160
  } else if (member.roles.cache.has(lvl170)) {
    return 170
  } else if (member.roles.cache.has(lvl180)) {
    return 180
  } else if (member.roles.cache.has(lvl190)) {
    return 190
  } else if (member.roles.cache.has(lvl200)) {
    return 200
  } else {
    return 0
  }
}

export function updateMemberData (member: GuildMember, data: IData, dataFile: string, botRelease: number, client: Client): IData | void {
  function restoreMemberData (objName: string): boolean | string | number | null {
    data = loadData(dataFile)
    if (objName in data.memberList[member.user.id]) {
      const memberData = data.memberList[member.user.id]
      return (data.memberList[member.user.id])[objName as keyof typeof memberData]
    } else {
      return null
    }
  }

  function pointsMaxLvl (member: GuildMember): number {
    if (member.roles.cache.has('721089379547873340')) {
      return 8
    } else if (member.roles.cache.has(lvl01)) {
      return 0
    } else if (member.roles.cache.has(lvl10)) {
      return 1
    } else if (member.roles.cache.has(lvl20)) {
      return 1
    } else if (member.roles.cache.has(lvl30)) {
      return 1
    } else if (member.roles.cache.has(lvl40)) {
      return 2
    } else if (member.roles.cache.has(lvl50)) {
      return 2
    } else if (member.roles.cache.has(lvl60)) {
      return 3
    } else if (member.roles.cache.has(lvl70)) {
      return 3
    } else if (member.roles.cache.has(lvl80)) {
      return 4
    } else if (member.roles.cache.has(lvl90)) {
      return 4
    } else if (member.roles.cache.has(lvl100)) {
      return 5
    } else if (member.roles.cache.has(lvl110)) {
      return 5
    } else if (member.roles.cache.has(lvl120)) {
      return 6
    } else if (member.roles.cache.has(lvl130)) {
      return 6
    } else if (member.roles.cache.has(lvl140)) {
      return 7
    } else if (member.roles.cache.has(lvl150)) {
      return 7
    } else if (member.roles.cache.has(lvl160)) {
      return 8
    } else if (member.roles.cache.has(lvl170)) {
      return 8
    } else if (member.roles.cache.has(lvl180)) {
      return 8
    } else if (member.roles.cache.has(lvl190)) {
      return 8
    } else if (member.roles.cache.has(lvl200)) {
      return 8
    } else {
      return 0
    }
  }

  if (!('memberList' in data)) {
    data.memberList = {}
    console.log('Creating member list (data)')
    saveData(dataFile, data)
  }

  if (!(member.user.id in data.memberList)) {
    console.log('New member data in json (data)')
  }

  if (restoreMemberData('authorized') == null) {
    if (member.roles.cache.has('721660842176806965')) {
      data.memberList[member.user.id].authorized = true
      console.log('Authorized = null updating to true (data)')
      saveData(dataFile, data)
    } else {
      data.memberList[member.user.id].authorized = false
      console.log('Authorized = null updating to false (data)')
      saveData(dataFile, data)
    }
  }

  if (!member.joinedTimestamp) return console.log('No joined timestamp (data)')
  if ((member.joinedTimestamp < botRelease) || member.user.bot) {
    if (restoreMemberData('authorized') !== true || restoreMemberData('legacyMember') !== true) {
      data.memberList[member.user.id].authorized = true
      data.memberList[member.user.id].authorizedById = '141957307591426050'
      data.memberList[member.user.id].authorizedByName = 'JPSAUD501'
      data.memberList[member.user.id].legacyMember = true
      console.log('Legacy member or bot detected (data)')
      saveData(dataFile, data)
    }
  } else if (restoreMemberData('authorized') === true && (restoreMemberData('authorizedById') == null)) {
    const clientUser = client.user
    if (!clientUser) return console.log('No client user (data)')
    data.memberList[member.user.id].authorizedById = clientUser.id
    data.memberList[member.user.id].authorizedByName = clientUser.username
    data.memberList[member.user.id].legacyMember = false
    console.log('Member missing authorizedById updating to bot id and name (data)')
    saveData(dataFile, data)
  } else if (restoreMemberData('legacyMember') !== false) {
    data.memberList[member.user.id].legacyMember = false
    console.log('Not legacyMember (data)')
    saveData(dataFile, data)
  }

  if (sinceDays(member.joinedTimestamp) == null) {
    if (restoreMemberData('pointsMax') !== pointsMaxLvl(member)) {
      data.memberList[member.user.id].pointsMax = pointsMaxLvl(member)
      data.memberList[member.user.id].points = pointsMaxLvl(member)
      console.log('1 - Updating points and pointsMax (data)')
      saveData(dataFile, data)
    }
  } else if (sinceDays(member.joinedTimestamp) >= 15) {
    if (restoreMemberData('pointsMax') !== (pointsMaxLvl(member) + 2)) {
      data.memberList[member.user.id].pointsMax = (pointsMaxLvl(member) + 2)
      console.log('2 - Updating pointsMax (data)')
      saveData(dataFile, data)
    }
  } else if (sinceDays(member.joinedTimestamp) >= 1) {
    if (restoreMemberData('pointsMax') !== (pointsMaxLvl(member) + 1)) {
      data.memberList[member.user.id].pointsMax = (pointsMaxLvl(member) + 1)
      console.log('3 - Updating pointsMax (data)')
      saveData(dataFile, data)
    }
  } else {
    if ((restoreMemberData('pointsMax') !== pointsMaxLvl(member))) {
      data.memberList[member.user.id].pointsMax = pointsMaxLvl(member)
      data.memberList[member.user.id].points = pointsMaxLvl(member)
      console.log('4 - Updating points and pointsMax (data)')
      saveData(dataFile, data)
    }
  }

  if (restoreMemberData('pointsLastDayUpdate') !== moment(Date.now()).format('DD/MM/YYYY')) {
    data.memberList[member.user.id].pointsLastDayUpdate = moment(Date.now()).format('DD/MM/YYYY')
    const points = restoreMemberData('points')
    if (!points) return console.log('No points (data)')
    if (points !== null) {
      const pointsMax = restoreMemberData('pointsMax')
      if (!pointsMax) return console.log('No pointsMax (data)')
      if (points < pointsMax) {
        data.memberList[member.user.id].points = points as number + 1
      }
    } else {
      const points = restoreMemberData('pointsMax') as number
      data.memberList[member.user.id].points = points
    }
    console.log('Updating pointsLastDayUpdate and points (data)')
    saveData(dataFile, data)
  }

  const points = restoreMemberData('points')
  if (!points) return console.log('No points (data)')
  const pointsMax = restoreMemberData('pointsMax')
  if (!pointsMax) return console.log('No pointsMax (data)')
  if (points == null) {
    data.memberList[member.user.id].points = pointsMax as number
    console.log('Updating null points (data)')
    saveData(dataFile, data)
  }

  if (points > pointsMax) {
    data.memberList[member.user.id].points = pointsMax as number
    console.log('Points > PointsMax - Updating to max (data)')
    saveData(dataFile, data)
  }

  if (restoreMemberData('authorizedTimeUnix') == null) {
    if (restoreMemberData('authorized')) {
      data.memberList[member.user.id].authorizedTimeUnix = member.joinedTimestamp
      console.log('Updating authorizedTimeUnix to joinTimeUnix (data)')
      saveData(dataFile, data)
    }
  }

  const memberData: IMemberData = {
    id: member.user.id,
    user: member.user.username,
    noob: (!member.roles.cache.has('721660842176806965')),
    bot: member.user.bot,
    birthday: birthday(member.joinedTimestamp as number),
    lastBdayMsg: restoreMemberData('lastBdayMsg') as string,
    age: age(member.joinedTimestamp as number),
    memberSinceDays: sinceDays(member.joinedTimestamp as number),
    memberSincePlusTime: sinceDays(member.joinedTimestamp as number) + parseFloat((0.235959 - parseFloat(moment(member.joinedTimestamp).format('HHmmss')) / 1000000).toString()),
    daysToBday: daysToBday(member.joinedTimestamp as number),
    joinTimeUnix: member.joinedTimestamp,
    joinDate: moment(member.joinedTimestamp).format('DD/MM/YYYY'),
    joinTime: moment(member.joinedTimestamp).format('HH:mm:ss'),
    joinString: timeToString(member.joinedTimestamp as number),
    authorized: restoreMemberData('authorized') as boolean,
    authorizedTimeUnix: restoreMemberData('authorizedTimeUnix') as number,
    authorizedById: restoreMemberData('authorizedById') as string,
    authorizedByName: restoreMemberData('authorizedByName') as string,
    pointsMax: restoreMemberData('pointsMax') as number,
    points: restoreMemberData('points') as number,
    pointsLastDayUpdate: restoreMemberData('pointsLastDayUpdate') as string,
    legacyMember: restoreMemberData('legacyMember') as boolean,
    avatarUrl: member.displayAvatarURL(),
    msgId: restoreMemberData('msgId') as string
  }

  if (JSON.stringify(memberData) !== JSON.stringify(data.memberList[member.user.id])) {
    data.memberList[member.user.id] = memberData
    console.log('Updating member data (data)')
    saveData(dataFile, data)
  }

  if (memberData.authorized === true && !member.roles.cache.has('721660842176806965') && !member.roles.cache.has('721650485131477005')) {
    console.log('Add MEMBER role to member! (data)')
    const role = member.guild.roles.cache.get('721660842176806965')
    if (!role) return console.log('No MEMBER role! (data)')
    member.roles.add(role)
  }

  return data
}
