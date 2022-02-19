const { newMemberCard } = require("./cardMaker");

async function memberExitedLog(client, guildid, member) {
    if(member.guild.id !== guildid) return;
    if(member.user.bot) return;
    const guild = client.guilds.cache.get(guildid);
    const logchannelId = process.env["eventschannel"];
    const logchannel = guild.channels.cache.get(logchannelId);
    await logchannel.send(`O membro **"${member.user.username}" - "${member.user.toString()}"** acabou de sair do servidor.`).catch();
};

async function memberJoinedLog(client, guildid, member) {
    try{
        if(member.guild.id !== guildid) return;
        if(member.user.bot) return;
        const guild = client.guilds.cache.get(guildid);
        const logchannelId = process.env["eventschannel"];
        const logchannel = guild.channels.cache.get(logchannelId);
        await logchannel.send(`O membro **"${member.user.username}" - "${member.user.toString()}"** acabou de entrar no servidor.`).catch();
        const cardImg = await newMemberCard(guildid, member);
        const cardChannelId = process.env["historychannel"]; 
        const cardChannel = guild.channels.cache.get(cardChannelId);
        await cardChannel.send({
            files: [{
                attachment: cardImg,
                name: 'card.png' 
            }]
        }).catch();
        await logchannel.send(`O membro **${member.user.username} - "${member.user.toString()}"** acabou de receber com sucesso seu card do servidor.`).catch();
    }catch(err){
        console.log(err);
    }
};

module.exports = {
    memberExitedLog: memberExitedLog,
    memberJoinedLog: memberJoinedLog
};