// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { GuildMember } from 'discord.js'
import nodeHtmlToImage from 'node-html-to-image'
import randomColor from 'randomcolor'
import { IMemberData } from '../interfaces/interfaces'
import { timeToString } from './moment'
const newMemberCardHtml = require('fs').readFileSync('././newMemberCardHtml.html', 'utf8')
const bdayMemberCardHtml = require('fs').readFileSync('././bdayMemberCardHtml.html', 'utf8')

export async function newMemberCard (guildId: string, member: GuildMember): Promise<string | Buffer | (string | Buffer)[] | void> {
  try {
    if (member.guild.id !== guildId) return
    if (member.user.bot) return
    console.log(`Generating new card for ${member.user.username}`)
    const hueColorArray = ['red', 'orange', 'pink', 'green']
    const hueColor = hueColorArray[Math.round((Math.random() * 1000) % hueColorArray.length)]
    let memberName = member.user.username
    if (memberName.length > 16) memberName = memberName.substring(0, 16)
    const memberJoinedTS = member.joinedTimestamp
    if (!memberJoinedTS) return console.log(`${member.user.username} joined timestamp is null (newMemberCard)`)
    const image = await nodeHtmlToImage({
      html: newMemberCardHtml,
      content: {
        name: memberName,
        imageUrl: member.displayAvatarURL(),
        color1: randomColor({
          luminosity: 'dark',
          format: 'rgba',
          hue: hueColor,
          alpha: 1
        }),
        date: timeToString(memberJoinedTS)
      }
    })
    return image
  } catch (err) {
    console.log(err)
  }
}

export async function bdayMemberCard (memberData: IMemberData): Promise<string | Buffer | (string | Buffer)[] | void> {
  try {
    if (memberData.bot) return
    console.log(`Generating new card for ${memberData.user}`)
    const hueColorArray = ['red', 'orange', 'pink', 'green']
    const hueColor = hueColorArray[Math.round((Math.random() * 1000) % hueColorArray.length)]
    let memberName = memberData.user
    if (memberName.length > 10) memberName = memberName.substring(0, 10)
    let years = ''
    if (memberData.age === 1) years = '1 ANO'
    else years = `${memberData.age} ANOS`
    const image = await nodeHtmlToImage({
      html: bdayMemberCardHtml,
      content: {
        name: memberName,
        imageUrl: memberData.avatarUrl,
        color1: randomColor({
          luminosity: 'dark',
          format: 'rgba',
          hue: hueColor,
          alpha: 1
        }),
        joinString: memberData.joinString,
        years
      }
    })
    return image
  } catch (err) {
    console.log(err)
  }
}
