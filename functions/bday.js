const Discord = require("discord.js");
const {MessageEmbed} = require('discord.js')
const moment = require('moment');
moment.locale('pt-br');

function bday(client, guildid, fusotime, member){
  var todayyear = moment(Date.now()+fusotime).format('DD/MM/YYYY')
  var todaymonth = moment(Date.now()+fusotime).format('DD/MM')
  if(member.birthday == todaymonth){
    if(member.bot) return console.log("BOT (bday)");
    if(member.joinDate == todayyear) return console.log("Joined today (bday)");
    console.log("gdversario de:", member.user)
    
    //Send message!
    const guild = client.guilds.cache.get(guildid);
    guild.members.fetch(member.id).then((user) => {
      var embed = new MessageEmbed()
            .setTitle(`Parabens! Hoje ${member.user} completa seu ${member.age}º GDversario!`)
            .setColor(255)
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`Há ${member.age} ano(s) ${member.user} se juntava ao Grupo Disparate!`)
            .addField("Se tornou membro do GD:", `${member.joinString}`, true);

      client.channels.cache.get(process.env['channelbday']).send({embeds: [embed]});
    }).catch(console.error);
    
  }
}

module.exports = {
    bday: bday
};