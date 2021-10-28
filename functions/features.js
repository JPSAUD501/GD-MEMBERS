const {loadData, memberLevel} = require("./data");
const {birthday} = require("./moment");
const emojiRegex = require('emoji-regex');
const regex = emojiRegex();
var timer = [];

function cFL(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function callName(client, guildid, datafile, fusotime){
  function everyMinute(){
  try{
    var data = loadData(datafile);
    var guild = client.guilds.cache.get(guildid);
    guild.channels.cache.forEach(channel => {
      if(channel.parentId !== "720275637415182420") return;
      if(!channel.name.includes("┊")) return;
      channel.members.forEach(member => {
        if(memberLevel(member) < 30) return;
        if(data.memberList[member.user.id].birthday == birthday(Date.now(), fusotime)){
          var gdvcallname = "🎊┊"+member.user.username
          if(channel.name == gdvcallname) return;
          if(channel.name.includes("🎊")) return;
          console.log("Gdversariante or new member present in the voice channel (features)");
          channel.setName("🎊┊"+member.user.username);
        }
      });
    });
  }catch(e){console.log(e)}
  }

  function every30Minutes(){
  try{
    var guild = client.guilds.cache.get(guildid);
    guild.members.fetch().then(members => { members.forEach(member => {
      try{
        let m = member
        member.presence.activities.forEach(function(activity){

          if(activity.applicationId == "700136079562375258"){
            //VALORANT
            console.log(m.user.username, "---", activity);
          }
          if(activity.applicationId == "401518684763586560"){
            //LoL
            console.log(m.user.username, "---", activity);
          }
          if(activity.applicationId == "821361671729709086"){
            //BlueStacks 5
            console.log(m.user.username, "---", activity);
          }

        });
      }catch(e){}      
    })}).catch(console.error);
  }catch(e){console.log(e)}
  }
  everyMinute();
  every30Minutes();
  var loop1 = setInterval(function(){ everyMinute(); }, 30000);
  var loop2 = setInterval(function(){ every30Minutes(); }, 60000*15);
}

function commands(client, message, prefix, guildid){
  try{
  if(!message.content.startsWith(prefix)) return;
  var msg = message.content.split(" ");
  msg = msg.filter((a) => a);

  if(msg[0] == "/callname" || "/renomear"){
    //Check channel
    if(message.channel.id !== "771257420470157322") return;

    console.log("New command! (features)");
    console.log(msg);
    const guild = client.guilds.cache.get(guildid)
    guild.members.fetch(message.author.id).then((user) => {
      if(memberLevel(user) < 50) return message.reply({content: "Para usar esse comando você precisa ser LvL 50 aqui no servidor. Para saber como verificar seu nível leia o canal <#768686751291408424>."}).catch();
      const vChannel = message.member.voice.channel;
      if (!vChannel) return message.reply({content: "Entre em um canal para poder trocar o nome dele!"}).catch();
      if(vChannel.parentId !== "720275637415182420") return message.reply({content: "Entre em um canal válido para renomea-lo!"}).catch();
      if(!vChannel.name.includes("┊")) return message.reply({content: "Entre em um canal válido para renomea-lo!"}).catch();
      if(!msg[1] || !msg[2]) return message.reply({content: "Para trocar o nome do canal de voz mande **/callname (emoji) (nome)**. "}).catch();
      if(timer[vChannel.id] && (((Date.now()-timer[vChannel.id]) / 1000) <= 300 )) return message.reply({content: "O Discord só permite a troca do nome do canal a cada 5 minutos. Tente renomear outro canal de voz ou aguarde e tente novamente em **" + parseInt(300 - ((Date.now()-timer[vChannel.id]) / 1000)) + " segundos** para poder alterar o nome desse!" }).catch();

      //Emoji
      const match = msg[1].match(regex)
      if(!match) return message.reply({content: "Não foi possivel identiicar um emoji. Para usar esse comando mande **/callname (emoji) (nome)**. Se você colocou um emoji tente utilizar outro por favor, lembrando que emojis de servidores do Discord não são aceitos."}).catch();
      const emojiarray = match[0];
      const emoji = [...emojiarray][0];

      //Text
      var text = msg;
      text.shift();
      text.shift();
      text = text.join(" ");
      const match2 = text.match(regex)
      if(match2) return message.reply({content: "Não utilize emojis no campo de nome do comando. Para usar esse comando mande **/callname (emoji) (nome)**."}).catch();
      text = cFL(text);
      if(text.lenth > 10) return message.reply({content: "O campo de nome não pode ter mais de 15 caracteres. Para usar esse comando mande **/callname (emoji) (nome)**."}).catch();

      //Name
      const name = emoji + "┊" + text;
      console.log(name);
      message.reply({content: `Trocando o nome do canal para: **${name}**\n\nSe em até 10 segundos o nome não mudar tente novamente daqui 5 minutos devido as limitações do Discord.`});
      vChannel.setName(name).then(channel => {
        console.log("New name in voice channel (features)");
        timer[vChannel.id] = Date.now();
        message.reply({content: "Pronto! O canal foi renomeado com sucesso!"}).catch();
      }).catch(console.error);
    });
  }
  }catch(e){console.log(e)}
}

module.exports = {
    callName: callName,
    commands: commands
};