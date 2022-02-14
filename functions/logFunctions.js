const nodeHtmlToImage = require('node-html-to-image');
const { html } = require(`./htmlGenerator`);
var randomColor = require('randomcolor');

async function memberExitedLog(client, guildid, member) {
    if(member.guild.id !== guildid) return;
    if(member.user.bot) return;
    const guild = client.guilds.cache.get(guildid);
    const logchannelId = process.env["eventschannel"];
    const logchannel = guild.channels.cache.get(logchannelId);
    await logchannel.send(`O membro **${member.user.username} - ${member.user.toString()}** acabou de saiu do servidor.`).catch();
};

async function memberJoinedLog(client, guildid, member) {
    if(member.guild.id !== guildid) return;
    if(member.user.bot) return;
    const guild = client.guilds.cache.get(guildid);
    const logchannelId = process.env["eventschannel"];
    const logchannel = guild.channels.cache.get(logchannelId);
    await logchannel.send(`O membro **${member.user.username} - ${member.user.toString()}** acabou de entrar no servidor.`).catch();
    const cardImg = await newMemberCard(client, guildid, member);
    const cardChannelId = process.env["historychannel"]; 
    const cardChannel = guild.channels.cache.get(cardChannelId);
    await cardChannel.send({
        //content: `${member.toString()}⁣`, 
        files: [{
            attachment: cardImg,
            name: 'card.png' 
        }]
    }).catch();
    await logchannel.send(`O membro **${member.user.username} - ${member.user.toString()}** acabou de receber com sucesso seu card do servidor.`).catch();
};

async function newMemberCard(client, guildid, member) {
    if(member.guild.id !== guildid) return;
    if(member.user.bot) return;
    console.log(`Generating new card for ${member.user.username}`);
    const guild = client.guilds.cache.get(guildid);
    const hueColorArray = ['red', 'orange', 'green', 'pink']
    const hueColor = hueColorArray[Math.floor(Math.random() * hueColorArray.length)];
    const p1 = {luminosity: 'light', format: 'rgba', hue: hueColor, alpha: 1};
    const p2 = {luminosity: 'bright', format: 'rgba', hue: hueColor, alpha: 1};
    const p3 = {luminosity: 'dark', format: 'rgba', hue: hueColor, alpha: 1};
    var memberName = member.user.username;
    if(memberName.length > 10) memberName = memberName.substring(0,14);
    const image = await nodeHtmlToImage({
        html: await html(),
        content: { name:memberName , imageUrl: await member.displayAvatarURL(), color1: randomColor(p1), color2: randomColor(p2), color3: randomColor(p3) }
    });
    return image;
};


module.exports = {
    memberExitedLog: memberExitedLog,
    memberJoinedLog: memberJoinedLog,
    newMemberCard: newMemberCard
};