const {MessageEmbed} = require('discord.js')
const {loadData, saveData} = require("./data");
const moment = require('moment');
moment.locale('pt-br');

function bday(client, guildid, fusotime, datafile, member){
  var todayyear = moment(Date.now()+fusotime).format('DD/MM/YYYY')
  var todaymonth = moment(Date.now()+fusotime).format('DD/MM')
  if(member.birthday == todaymonth){
    if(member.bot) return console.log("BOT (bday)");
    if(member.joinDate == todayyear) return console.log("Joined today (bday)");
    if(member.lastBdayMsg == todayyear) return console.log("Message alrady sended (bday)");
    console.log("gdversario de:", member.user)
    
    //Send message!
    const guild = client.guilds.cache.get(guildid);
    guild.members.fetch(member.id).then((user) => {
      var embed = new MessageEmbed()
            .setTitle(`Parabens! Hoje ${member.user} completa seu ${member.age}º GDversário!`)
            .setColor(255)
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`Há ${member.memberSinceDays} dias ${member.user} se juntava ao Grupo Disparate!`)
            .addField("Se tornou membro do GD:", `${member.joinString}`, true);

      client.channels.cache.get(process.env['channelbday']).send({content: `<@${member.id}>`, embeds: [embed]});

      var data = loadData(datafile)
      data.memberList[member.id].lastBdayMsg = todayyear;
      data.memberList[member.id].lastBdayMsg = todayyear;
      console.log("Adding message id to data (newMember)")
      saveData(datafile, data);
    }).catch(console.error);
  }
}

module.exports = {
    bday: bday
};