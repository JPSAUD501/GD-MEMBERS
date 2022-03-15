const {MessageEmbed} = require('discord.js')
const {loadData, saveData} = require("./data");
const { bdayMemberCard } = require("./cardMaker");
const moment = require('moment');
moment.locale('pt-br');

async function bday(client, guildid, datafile, member){
  try{
    var todayyear = moment(Date.now()).format('DD/MM/YYYY')
    var todaymonth = moment(Date.now()).format('DD/MM')
    if(member.birthday == todaymonth){
      if(member.bot) return console.log("BOT (bday)");
      if(member.joinDate == todayyear) return console.log("Joined today (bday)");
      if(member.lastBdayMsg == todayyear) return console.log("Message alrady sended (bday)");
      console.log("GDVERSÁRIO de:", member.user)
      
      //Send message!
      const guild = client.guilds.cache.get(guildid);
      var data = loadData(datafile);
      var memberData = data.memberList[member.id];
      if(!memberData) return console.log("Member not found (bday)");
      const cardImg = await bdayMemberCard(guildid, memberData);
      const bdayChannelId = process.env['channelbday']; 
      const cardChannel = guild.channels.cache.get(bdayChannelId);
      await cardChannel.send({
          content: `<@${member.id}>`,
          files: [{
              attachment: cardImg,
              name: 'card.png' 
          }]
      }).catch();
      data.memberList[member.id].lastBdayMsg = todayyear;
      data.memberList[member.id].lastBdayMsg = todayyear;
      console.log("Adding message id to data (newMember)")
      saveData(datafile, data);
    }
  }catch(err){
    console.log(err);
  }
}

module.exports = {
    bday: bday
};