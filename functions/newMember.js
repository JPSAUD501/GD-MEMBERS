const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
const {loadData, saveData} = require("./data");
//const moment = require('moment');
//moment.locale('pt-br');

function newMember(client, guildid, member, datafile){
  const guild = client.guilds.cache.get(guildid);
  guild.members.fetch(member.user.id).then((user) => {
  console.log("Novo membro! (newMember)")
  var embed = new MessageEmbed()
            .setTitle(`Novo membro! Bem vindo ${member.user.username}!`)
            .setColor(255)
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`Peça para quem te convidou ou um VETERANO autorizar sua entrada clicando no botão verde logo abaixo!`);

  const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
          .setLabel("AUTORIZAR")
          .setStyle("SUCCESS")
          .setCustomId(`${member.user.id}`)
      )

    client.channels.cache.get(process.env['mainchannel']).send({ content: `<@${member.user.id}>`, embeds: [embed], components: [row] }).then((message) => {
      user.send(`Eae! blz?!\nPeça para quem te convidou ou um veterano autorizar sua entrada no Grupo Disparate clicando no botão verde dessa mensagem: https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`);
      var data = loadData(datafile);
      data.memberList[member.user.id].msgId = message.id
      console.log("Saving message id (newMember)");
      saveData(datafile, data);
    });
  });
}

function buttonClicked(client, interaction, datafile, guildid){
  if (!interaction.isButton()) return;
  var data = loadData(datafile);
  const guild = client.guilds.cache.get(guildid);
  guild.members.fetch(interaction.customId).then((user) => {
    
    //Verification Error
    if(user.user.username !== data.memberList[interaction.customId].user) return console.log("(newMember) Error:", user.user.username, data.memberList[interaction.customId].user);
    if(user._roles.includes("721660842176806965")) return console.log("(newMember) Error: Alredy MEMBER");
      

    //Verification Authorization
    //...............................................

    //Member data update
    var role = guild.roles.cache.get("721660842176806965");
    user.roles.add(role);
    data.memberList[interaction.customId].authorized = true
    data.memberList[interaction.customId].authorizedTimeUnix = Date.now();
    data.memberList[interaction.customId].authorizedById = interaction.user.id;
    data.memberList[interaction.customId].authorizedByName = interaction.user.username;
    console.log("Authorizing member (newMember)")
    saveData(datafile, data);

    var embed = new MessageEmbed()
              .setTitle(`Parabéns ${user.user.username}!`)
              .setColor(255)
              .setThumbnail(user.displayAvatarURL())
              .setDescription(`Você foi autorizado por ${interaction.user.username}!`);

    const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setLabel("JÁ AUTORIZADO!")
            .setStyle("SUCCESS")
            .setDisabled(true)
            .setCustomId(`${interaction.customId}`)
        )

    interaction.message.edit({ content: `<@${interaction.customId}>`, embeds: [embed], components: [row] })
    interaction.reply(`O membro ${user.user.username} foi autorizado com sucesso por ${interaction.user.username}`)
  });
}

module.exports = {
    newMember: newMember,
    buttonClicked: buttonClicked
};