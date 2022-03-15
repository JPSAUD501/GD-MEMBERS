const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js');
const {loadData, saveData, updateMemberData} = require("./data");
const {timeToString} = require("./moment");

async function newMember(client, guildid, member, datafile, botrelease){
  if(member.guild.id !== guildid) return;

  var data = loadData(datafile);

  if (data.memberList[member.id]) {
    console.log("New member in guild but its alrady in the data. Deleting:", data.memberList[member.id].user);
    delete data.memberList[member.id];
    console.log("Member alrady in the data, deleting! (newMember)");
    saveData(datafile, data);
  }
  updateMemberData(member, data, datafile, botrelease, guildid, client, 0);
  console.log("Saving new member data! (newMember)")
  saveData(datafile, data);

  if(member.user.bot) return;

  const guild = client.guilds.cache.get(guildid);
  const user = await guild.members.fetch(member.user.id).catch(console.error);
  console.log("Novo membro! (newMember)");

  const invites = await guild.invites.fetch({ channelId: '913590205485821992' });
  var authInvite = null;
  invites.some(function(invite) {
    if(invite.uses < 1) return false;
    authInvite = invite;
    invite.delete("Alredy used").catch(console.error);
    console.log("Inviter:", authInvite.inviter.username);
    return true;
  });
  
  function createMsg() {
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
        client.channels.cache.get(process.env['mainchannel']).send({ content: membersInVoiceTxt }).then(msg => { setTimeout(() => msg.delete(), 60000) }).catch();
    } else {
        console.log("0 active members in the guild (newMember)");
    }
    client.channels.cache.get(process.env['mainchannel']).send({ content: `<@${member.user.id}>`, embeds: [embed], components: [row] }).then((message) => {
      user.send(`Eae! blz?!\nPeça para quem te convidou ou algum outro membro autorizar sua entrada no Grupo Disparate clicando no botão verde dessa mensagem: https://discord.com/channels/${message.guildId}/${message.channelId}/${message.id}`).catch(console.error);
      data.memberList[member.user.id].msgId = message.id
      console.log("Saving message id (newMember)");
      saveData(datafile, data);
    });
  }

  if(authInvite){
    //Verification
    if(!user) return createMsg();
    var data = loadData(datafile);
    if(!data.memberList[authInvite.inviter.id]) return createMsg();
    if(member.user.id == authInvite.inviter.id) return createMsg();
    //if((data.memberList[authInvite.inviter.id].points < 1) || (data.memberList[authInvite.inviter.id].pointsMax < 1)) return createMsg();

    //Member authorizating data update
    /*if(authInvite.inviter.id !== process.env["ownerid"]){
      data.memberList[authInvite.inviter.id].points = data.memberList[authInvite.inviter.id].points - 1;
    }*/
    //Member authorizated data update
    var roleMember = await guild.roles.cache.get("721660842176806965");
    user.roles.add(roleMember);
    data.memberList[user.id].authorized = true
    data.memberList[user.id].authorizedTimeUnix = Date.now();
    data.memberList[user.id].authorizedById = authInvite.inviter.id;
    data.memberList[user.id].authorizedByName = authInvite.inviter.username;
    console.log("Authorizing member pre-authorized and update data of inviter member (newMember)")
    saveData(datafile, data);

    //Sending message to member and logging in the mod channel
    user.send(`Bem vindo ao GRUPO DISPARATE! Você foi convidado por ${authInvite.inviter.username}!\n\nVou pular o bla bla bla depois de "Bem Vindo" pois estou enviando essa mensagem para avisar que você pode escolher uma cor para o seu nome no canal "#📝┆seu-registro" ou pelo link: https://discord.com/channels/720275637415182416/729662955053907980/729671862220619807\n\nFlw!`);
    client.channels.cache.get(process.env['logchannel']).send({content:`**AUTORIZAÇÃO** - O usuário **"${user.user.username}" - "<@${user.id}>"** entrou usando um link pré aprovado criado por **"${authInvite.inviter.username}" - "<@${authInvite.inviter.id}>"** na **${timeToString(authInvite.createdTimestamp)}**. **(PONTOS ATUAIS DO MEMBRO AUTORIZADOR: ${data.memberList[authInvite.inviter.id].points}/${data.memberList[authInvite.inviter.id].pointsMax})**`}).catch(console.error);

  } else{
    createMsg();
  }
}

function buttonClicked(client, interaction, datafile, guildid){
  try{
  //console.log(interaction);
  if (!interaction.isButton()) return;
  var data = loadData(datafile);
  const guild = client.guilds.cache.get(guildid);
  guild.members.fetch(interaction.customId).then((user) => {
    
    //Verification Error
    if(user.user.id !== data.memberList[interaction.customId].id) return console.log("(newMember) (1) Error wrong id:", user.user.username, data.memberList[interaction.customId].user);
    if(user.user.id !== interaction.customId) return console.log("(newMember) (2) Error wrong id:", user.user.id, interaction.customId);
    if(user._roles.includes("721660842176806965")){
      interaction.reply({content:`<@${interaction.user.id}> O membro que você tentou autorizar já foi aprovado anteriormente!`, fetchReply: true}).then(replyMessage => {setTimeout(() => replyMessage.delete(), 15000)}).catch();
      interaction.message.delete().catch();
      return console.log("(newMember) Error: Alredy MEMBER");
    } 

    //Verification Authorization
    let rtrn1 = () => {
      interaction.reply({content:`<@${interaction.customId}> Você não pode autorizar a si mesmo! Peça para quem te convidou ou para algum outro membro!`, fetchReply: true}).then(replyMessage => {setTimeout(() => replyMessage.delete(), 15000)}).catch();
      client.channels.cache.get(process.env['logchannel']).send({content:`**AUTORIZAÇÃO NÃO CONCLUÍDA** - O usuário **"${interaction.user.username}" - "<@${interaction.user.id}>"** tentou autorizar a si mesmo.`}).catch(console.error);
    }
    if(interaction.customId == interaction.user.id) return rtrn1()

    let rtrn2 = () => {
      interaction.reply({content:`<@${interaction.customId}> Você ainda não é um membro autorizado do servidor e por isso nao pode autorizar novos membros!`, fetchReply: true}).then(replyMessage => {setTimeout(() => replyMessage.delete(), 15000)}).catch();
      client.channels.cache.get(process.env['logchannel']).send({content:`**AUTORIZAÇÃO NÃO CONCLUÍDA** - O usuário **"${interaction.user.username}" - "<@${interaction.user.id}>"** tentou autorizar **"${user.user.username}" - "<@${user.id}>"** a ser membro do servidor porem o mesmo ainda não foi autorizado.`}).catch(console.error);
    }
    if(!data.memberList[interaction.user.id].authorized) return rtrn2()

    if(interaction.user.id !== process.env["ownerid"]){
      let rtrn3 = () => {
        client.channels.cache.get(process.env['logchannel']).send({content:`**AUTORIZAÇÃO NÃO CONCLUÍDA** - O membro **"${interaction.user.username}" - "<@${interaction.user.id}>"** tentou autorizar **"${user.user.username}" - "<@${user.id}>"** a ser membro do servidor porem não possuia pontos suficentes. **(PONTOS ATUAIS DO MEMBRO AUTORIZADOR: ${data.memberList[interaction.user.id].points}/${data.memberList[interaction.user.id].pointsMax})**`}).catch(console.error);
        interaction.reply({content:`<@${interaction.user.id}> Infelizmente você não possui nivel ou tempo no servidor suficiente para autorizar novos membros! Continue ganhando pontos e subindo de nível!`, fetchReply: true}).then(replyMessage => {setTimeout(() => replyMessage.delete(), 15000)}).catch();
      }
      if((data.memberList[interaction.user.id].points < 1) || (data.memberList[interaction.user.id].pointsMax < 1)) return rtrn3();
    }

    //Member authorizating data update
    if(interaction.user.id !== process.env["ownerid"]){
      data.memberList[interaction.user.id].points = data.memberList[interaction.user.id].points - 1;
    }
    //Member authorizated data update
    var roleMember = guild.roles.cache.get("721660842176806965");
    user.roles.add(roleMember);
    data.memberList[interaction.customId].authorized = true
    data.memberList[interaction.customId].authorizedTimeUnix = Date.now();
    data.memberList[interaction.customId].authorizedById = interaction.user.id;
    data.memberList[interaction.customId].authorizedByName = interaction.user.username;
    console.log("Authorizing member and update data of who clicked the button (newMember)")
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
        );

    interaction.message.edit({ content: `<@${interaction.customId}>`, embeds: [embed], components: [row] }).catch();
    interaction.reply({content:`O usuário <@${interaction.customId}> foi autorizado com sucesso por <@${interaction.user.id}>`, fetchReply: true}).then(replyMessage => {setTimeout(() => replyMessage.delete(), 15000)}).catch();
    setTimeout(function(){ interaction.message.delete().catch() }, 60000);
    user.send(`Bem vindo ao GRUPO DISPARATE! Você foi autorizado por ${interaction.user.username}!\n\nVou pular o bla bla bla depois de "Bem Vindo" pois estou enviando essa mensagem para avisar que você pode escolher uma cor para o seu nome no canal "#📝┆seu-registro" ou pelo link: https://discord.com/channels/720275637415182416/729662955053907980/729671862220619807\n\nFlw!`);
    if(interaction.user.id == process.env["ownerid"]){
      client.channels.cache.get(process.env['logchannel']).send({content:`**AUTORIZAÇÃO** - O usuário **"${user.user.username}" - "<@${user.id}>"** foi autorizado a ser membro do servidor por **"${interaction.user.username}" - "<@${interaction.user.id}>"**. (NENHUM PONTO USADO)`}).catch(console.error);
    }
    else{
      client.channels.cache.get(process.env['logchannel']).send({content:`**AUTORIZAÇÃO** - O usuário **"${user.user.username}" - "<@${user.id}>"** foi autorizado a ser membro do servidor por **"${interaction.user.username}" - "<@${interaction.user.id}>"** usando **1** ponto. **(PONTOS ATUAIS DO MEMBRO AUTORIZADOR: ${data.memberList[interaction.user.id].points}/${data.memberList[interaction.user.id].pointsMax})**`}).catch(console.error);
    }
  }).catch(function(error){
      console.log(error);
      interaction.reply({content:`<@${interaction.user.id}> Parece que usuário não está mais presente no seridor! Convide ele novamente! / Caso seja um erro por favor contate um moderador no canal <#899842424401178694>.`, fetchReply: true}).then(replyMessage => {setTimeout(() => replyMessage.delete(), 15000)}).catch();
      interaction.message.delete().catch();
      return console.log("(newMember) Error: User probaly exit the server");
    }
  );
}catch(e){console.log(e)}
}

module.exports = {
    newMember: newMember,
    buttonClicked: buttonClicked
};