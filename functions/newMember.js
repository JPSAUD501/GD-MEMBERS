const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
const {loadData, saveData, updateMemberData} = require("./data");

async function newMember(client, guildid, member, datafile, fusotime, botrelease){
  var data = loadData(datafile);

  if (data.memberList[member.id]) {
    console.log("New member in guild but its alrady in the data. Deleting:", data.memberList[member.id].user);
    delete data.memberList[member.id];
    console.log("Member alrady in the data, deleting! (newMember)");
    saveData(datafile, data);
  }
  updateMemberData(member, data, datafile, botrelease, fusotime);

  if(member.user.bot) return;

  const guild = client.guilds.cache.get(guildid);
  guild.members.fetch(member.user.id).then((user) => {
  console.log("Novo membro! (newMember)")

  var membersInVoice = [];
  guild.channels.cache.forEach(channel => {
    if(channel.parentId == "771255883543216171") return;
    if(channel.type !== 'GUILD_VOICE'){
      if(channel.type !== 'GUILD_STAGE_VOICE') return;
    }
    channel.members.forEach(member => {
      membersInVoice.push(member.user.id);
    });
  });

  var membersInVoiceTxt = "**Membros ativos agora:** ";
  membersInVoice.forEach(id => {
    console.log(id);
    membersInVoiceTxt += `<@${id}>`;
  });

  var embed = new MessageEmbed()
            .setTitle(`Novo membro! Bem vindo ${member.user.username}!`)
            .setColor(255)
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`Peça para quem te convidou ou algum outro membro autorizar sua entrada clicando no botão verde logo abaixo!`);

  const row = new MessageActionRow()
			.addComponents(
        new MessageButton()
          .setLabel("AUTORIZAR")
          .setStyle("SUCCESS")
          .setCustomId(`${member.user.id}`)
      );

    if(membersInVoice.length > 0){
      client.channels.cache.get(process.env['mainchannel']).send({ content: membersInVoiceTxt }).then(msg => { setTimeout(() => msg.delete(), 120000) }).catch();
    } else {
      console.log("0 active members in the guild (newMember)");
    }
    client.channels.cache.get(process.env['mainchannel']).send({ content: `<@${member.user.id}>`, embeds: [embed], components: [row] }).then((message) => {
      user.send(`Eae! blz?!\nPeça para quem te convidou ou algum outro membro autorizar sua entrada no Grupo Disparate clicando no botão verde dessa mensagem: https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`);
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
    if(user.user.id !== data.memberList[interaction.customId].id) return console.log("(newMember) (1) Error wrong id:", user.user.username, data.memberList[interaction.customId].user);
    if(user.user.id !== interaction.customId) return console.log("(newMember) (2) Error wrong id:", user.user.id, interaction.customId);
    if(user._roles.includes("721660842176806965")){
      interaction.reply({content:`<@${interaction.user.id}> O membro que você tentou autorizar já foi aprovado!`, fetchReply: true}).then(replyMessage => {setTimeout(() => replyMessage.delete(), 15000)}).catch();
      interaction.message.delete();
      return console.log("(newMember) Error: Alredy MEMBER");
    } 

    //Verification Authorization
    if(interaction.customId == interaction.user.id) return interaction.reply({content:`<@${interaction.customId}> Você não pode autorizar a si mesmo! Peça para quem te convidou ou para algum outro membro!`, fetchReply: true}).then(replyMessage => {setTimeout(() => replyMessage.delete(), 15000)}).catch();

    if(interaction.user.id !== process.env["ownerid"]){
      if((data.memberList[interaction.user.id].points < 1) || (data.memberList[interaction.user.id].pointsMax < 1)) return interaction.reply({content:`<@${interaction.user.id}> Infelizmente você não possui nivel ou tempo no servidor suficiente para autorizar novos membros! Continue ganhando pontos e subindo de nivel!`, fetchReply: true}).then(replyMessage => {setTimeout(() => replyMessage.delete(), 15000)}).catch();
    }

    //Member authorizating data update
    if(interaction.user.id !== process.env["ownerid"]){
      data.memberList[interaction.user.id].points = data.memberList[interaction.user.id].points - 1
    }
    //Member authorizated data update
    var roleMember = guild.roles.cache.get("721660842176806965");
    var roleNovato = guild.roles.cache.get("896257202426376192");
    user.roles.add(roleMember);
    user.roles.remove(roleNovato);
    data.memberList[interaction.customId].authorized = true
    data.memberList[interaction.customId].authorizedTimeUnix = Date.now();
    data.memberList[interaction.customId].authorizedById = interaction.user.id;
    data.memberList[interaction.customId].authorizedByName = interaction.user.username;
    console.log("Authorizing member and who clicked button (newMember)")
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

    interaction.message.edit({ content: `<@${interaction.customId}>`, embeds: [embed], components: [row] });
    interaction.reply({content:`O membro <@${interaction.customId}> foi autorizado com sucesso por <@${interaction.user.id}>`, fetchReply: true}).then(replyMessage => {setTimeout(() => replyMessage.delete(), 15000)}).catch();
    setTimeout(function(){ interaction.message.delete() }, 60000);
  }).catch(function(error){
      console.log(error);
      interaction.reply({content:`<@${interaction.user.id}> Esse membro não está mais presente no seridor! Convide ele novamente!`, fetchReply: true}).then(replyMessage => {setTimeout(() => replyMessage.delete(), 15000)}).catch();
      interaction.message.delete();
      return console.log("(newMember) Error: Member exit the server");
    }
  );
}

module.exports = {
    newMember: newMember,
    buttonClicked: buttonClicked
};