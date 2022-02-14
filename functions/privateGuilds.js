const {MessageEmbed} = require('discord.js');
const fetch = require("node-fetch");

async function newPrivateGuildMember(client, guildid, member){
  if(member.guild.id == guildid) return;
  var guild = client.guilds.cache.get(guildid);
  try{var joinedMember = await guild.members.fetch(member.user.id).catch()}catch(e){}
  if (!joinedMember){
    await member.send(`Você precisa ser um membro autorizado do Grupo Disparate para poder entrar em um servidor privado. Para isso acesse o link a seguir e peça para quem te convidou para o servidor privado autorizar seu pedido para se tornar membro no Grupo Disparate!\nhttps://discord.gg/dvHU2rupA2`);
    var embed = new MessageEmbed()
            .setTitle(`O usuario ${member.user.username} tentou entrar no servidor porem não era um membro do GD!`)
            .setColor("#E74C3C")
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`Acabei de enviar o link de convite do servidor para ${member.user}, assim que alguem autorizar a entrada do mesmo no GD ele poderá se tornar um membro desse servidor privado!`)
            .addField("Link de convite do GD:", `https://discord.gg/dvHU2rupA2`, true)
            .addField("Link do canal de autorizações do GD:", `https://discord.com/channels/720275637415182416/899835574343589890`, true);
      var mainChatChannel = await member.guild.channels.cache.find(channel => channel.name == "🌎┆geral-privado");
      await mainChatChannel.send({content: `${guild.roles.everyone}`, embeds: [embed]}).catch(console.error);
      member.kick().catch(console.error);
      console.log("Member joined DENIED in private guild (privateGuilds)");
  } else if(!joinedMember._roles.includes("721660842176806965")){
    await member.send(`Você precisa ser um membro autorizado do Grupo Disparate para poder entrar em um servidor privado. Para isso acesse o link a seguir e peça para quem te convidou para o servidor privado autorizar seu pedido para se tornar membro no Grupo Disparate!\nhttps://discord.gg/dvHU2rupA2`);
    var embed = new MessageEmbed()
            .setTitle(`O usuario ${member.user.username} tentou entrar no servidor porem não era um membro autorizado do GD!`)
            .setColor("#E74C3C")
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`Acabei de enviar o link de convite do servidor para ${member.user}, assim que alguem autorizar a entrada do mesmo no GD ele poderá se tornar um membro desse servidor privado!`)
            .addField("Link de convite do GD:", `https://discord.gg/dvHU2rupA2`, true)
            .addField("Link do canal de autorizações do GD:", `https://discord.com/channels/720275637415182416/899835574343589890`, true);
      var mainChatChannel = await member.guild.channels.cache.find(channel => channel.name == "🌎┆geral-privado");
      await mainChatChannel.send({content: `${guild.roles.everyone}`, embeds: [embed]}).catch(console.error);
      member.kick().catch(console.error);
      console.log("Member joined DENIED in private guild (privateGuilds)");
  } else {
    console.log("Member joined OK in private guild (privateGuilds)");
    if(member.user.id == process.env["ownerid"]){
      var ownerRolePrivate = member.guild.roles.cache.find(role => role.name == "『PRIMEIRO-MINISTRO』");
      await member.roles.add(ownerRolePrivate).catch(console.error);
    }
    var memberRolePrivate = member.guild.roles.cache.find(role => role.name == "『MEMBRO』");
    await member.roles.add(memberRolePrivate).catch(console.error);

    var embed = new MessageEmbed()
            .setTitle(`O usuario ${member.user.username} acabou de entrar neste servidor privado!`)
            .setColor("#2ECC71")
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(`Bem vindo ${member.user}!`)
      var mainChatChannel = await member.guild.channels.cache.find(channel => channel.name == "🌎┆geral-privado");
      await mainChatChannel.send({content: `${guild.roles.everyone}`, embeds: [embed]}).catch(console.error);
  }
}

async function oldPrivateGuildMember(client, guildid, member, fusotime){
  if(member.guild.id == guildid) return;
  var guild = client.guilds.cache.get(guildid);
  console.log("Member exited OK in private guild (privateGuilds)");
  if((Date.now() - member.joinedTimestamp) <= 5000) return;
  var embed = new MessageEmbed()
          .setTitle(`O membro ${member.user.username} acabou de sair deste servidor privado!`)
          .setColor("#FFA500")
          .setThumbnail(member.user.displayAvatarURL())
          .setDescription(`Até mais ${member.user}!`)
  var mainChatChannel = await member.guild.channels.cache.find(channel => channel.name == "🌎┆geral-privado");
  await mainChatChannel.send({content: `${guild.roles.everyone}`, embeds: [embed]}).catch(console.error);
}

async function privateGuildCommand(client, message, prefix, guildid){
  if(message.guildId == guildid) return;

  var msg = message.content.split(" ");
  msg = msg.filter((a) => a);

  if(msg[0] == "/youtube" || msg[0] == "/yt"){
    console.log("YT Command in private guild (privateGuilds)");
    const channel = message.member.voice.channel;
    if (!channel || channel.type !== "GUILD_VOICE") return await message.reply("Entre no canal de voz desse servidor privado para poder iniciar o YouTube Together.");
    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913", // youtube together
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }}).then(res => res.json()).then(invite => {
                if (invite.error || !invite.code) return message.reply("Entre no canal de voz desse servidor privado para poder iniciar o YouTube Together.");
                message.reply(`**Link do YTT gerado com sucesso!**\n<https://discord.gg/${invite.code}>`);
            }).catch(e => {
                message.reply("Entre no canal de voz desse servidor privado para poder iniciar o YouTube Together.");
            });
  }
  
}

module.exports = {
    newPrivateGuildMember: newPrivateGuildMember,
    oldPrivateGuildMember: oldPrivateGuildMember,
    privateGuildCommand: privateGuildCommand
};