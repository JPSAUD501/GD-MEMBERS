const nodeHtmlToImage = require('node-html-to-image');
const randomColor = require('randomcolor');
const newMemberCardHtml = require('fs').readFileSync('././newMemberCardHtml.html', 'utf8');
const bdayMemberCardHtml = require('fs').readFileSync('././bdayMemberCardHtml.html', 'utf8');
const { timeToString } = require("./moment");

async function newMemberCard(guildid, member) {
  try{
    if(member.guild.id !== guildid) return;
    if(member.user.bot) return;
    console.log(`Generating new card for ${member.user.username}`);
    const hueColorArray = ['red', 'orange', 'pink', 'green'];
    const hueColor = hueColorArray[Math.round((Math.random()*1000) % hueColorArray.length)];
    const p1 = {luminosity: 'dark', format: 'rgba', hue: hueColor, alpha: 1};
    var memberName = member.user.username;
    if(memberName.length > 16) memberName = memberName.substring(0,16);
    const image = await nodeHtmlToImage({
        html: newMemberCardHtml,
        content: { name:memberName , imageUrl: await member.displayAvatarURL(), color1: randomColor(p1), date: timeToString(member.joinedTimestamp) }
    });
    return image;
  }catch(err){
    console.log(err);
  }
};

async function bdayMemberCard(guildid, memberData) {
  try{
    if(memberData.bot) return;
    console.log(`Generating new card for ${memberData.user}`);
    const hueColorArray = ['red', 'orange', 'pink', 'green'];
    const hueColor = hueColorArray[Math.round((Math.random()*1000) % hueColorArray.length)];
    const p1 = {luminosity: 'dark', format: 'rgba', hue: hueColor, alpha: 1};
    var memberName = memberData.user;
    if(memberName.length > 10) memberName = memberName.substring(0,10);
    var years = "";
    if(memberData.age == 1) years = "1 ANO";
    else years = `${memberData.age} ANOS`;
    const image = await nodeHtmlToImage({
        html: bdayMemberCardHtml,
        content: { name:memberName , imageUrl: await memberData.avatarUrl, color1: randomColor(p1), joinString: memberData.joinString, years: years }
    });
    return image;
  }catch(err){
    console.log(err);
  }
};

module.exports = {
    newMemberCard: newMemberCard,
    bdayMemberCard: bdayMemberCard
};