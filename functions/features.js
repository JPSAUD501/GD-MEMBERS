const allEmojis = require("./emojis").allEmojis
const {saveData, loadData, memberLevel} = require("./data");
const {birthday} = require("./moment");
const emojiRegex = require('emoji-regex');
const regex = emojiRegex();
var randomColor = require('randomcolor');
var timer = [];
var timerRole = [];
var timerPoi = [];
var roleDelay = 0.5;

var roleLvl = "909711622640115742";
var roleDivMain = "909710113907023893";
var roleStaff = "909713172653543454";
var roleInsignia = "909711093537079346";

function isOdd(num) { return num % 2;}

function get_random (list) {
  return list[Math.floor((Math.random()*list.length))];
}

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

  function every15Minutes(){
  try{
    var guild = client.guilds.cache.get(guildid);
    guild.members.fetch().then(members => { members.forEach(member => {
      try{
        let m = member
        member.presence.activities.forEach(function(activity){

          if(activity.applicationId == "700136079562375258"){
            //VALORANT
            //console.log(m.user.username, "---", activity);
          }
          if(activity.applicationId == "401518684763586560"){
            //LoL
            //console.log(m.user.username, "---", activity);
          }
          if(activity.applicationId == "821361671729709086"){
            //BlueStacks 5
            //console.log(m.user.username, "---", activity);
          }

        });
      }catch(e){}      
    })}).catch(console.error);
  }catch(e){console.log(e)}
  }

  function memberCounter(){
  try{
    const guild = client.guilds.cache.get(guildid);
    const memberRole = guild.roles.cache.get('721660842176806965');
    const counter = memberRole.members.size;
    console.log("Updating channel topic: " + counter + " (features)");
    var counterEmoji = counter.toString();
    counterEmoji = counterEmoji.replace(/0/gi ,"0️⃣");
    counterEmoji = counterEmoji.replace(/1/gi ,"1️⃣");
    counterEmoji = counterEmoji.replace(/2/gi ,"2️⃣");
    counterEmoji = counterEmoji.replace(/3/gi ,"3️⃣");
    counterEmoji = counterEmoji.replace(/4/gi ,"4️⃣");
    counterEmoji = counterEmoji.replace(/5/gi ,"5️⃣");
    counterEmoji = counterEmoji.replace(/6/gi ,"6️⃣");
    counterEmoji = counterEmoji.replace(/7/gi ,"7️⃣");
    counterEmoji = counterEmoji.replace(/8/gi ,"8️⃣");
    counterEmoji = counterEmoji.replace(/9/gi ,"9️⃣");
    const channel = client.channels.cache.get("720275637860040784");
    channel.setTopic(`Chat geral! Contador de membros: ${counterEmoji}`);
  }catch(e){console.log(e)}
  }

  function divRoles(){
  try{
    console.log("Updating divsRoles (features)");
    var guild = client.guilds.cache.get(guildid);
    guild.members.fetch().then(members => { members.forEach(member => {
      try{
        let m = member
        
        m._roles.forEach(roleId => {
          const role = guild.roles.cache.get(roleId);
          if(role.name.includes("✮")){
            if(!m._roles.includes(roleLvl)){
              if(timerRole["role"] && (((Date.now()-timerRole["role"]) / 1000) < roleDelay )){
                return
                } else{
                  console.log(m.user.username, "Giving role Lvl (features)");
                  m.roles.add(guild.roles.cache.get(roleLvl));
                  timerRole["role"] = Date.now();
              }              
            }
          }
          if(role.name.includes("『")){
            if(!m._roles.includes(roleDivMain)){
              if(timerRole["role"] && (((Date.now()-timerRole["role"]) / 1000) < roleDelay )){
                return
                } else{
                  console.log(m.user.username, "Giving role DivMain (features)");
                  m.roles.add(guild.roles.cache.get(roleDivMain));
                  timerRole["role"] = Date.now();
              }
            }
          }
          if(role.name.includes("🏳")){
            if(!m._roles.includes(roleStaff)){
              if(timerRole["role"] && (((Date.now()-timerRole["role"]) / 1000) < roleDelay )){
                return
                } else{
                  console.log(m.user.username, "Giving role Staff (features)");
                  m.roles.add(guild.roles.cache.get(roleStaff));
                  timerRole["role"] = Date.now();
              }
            }
          }
          if(role.name.includes("🎖")){
            if(!m._roles.includes(roleInsignia)){
              if(timerRole["role"] && (((Date.now()-timerRole["role"]) / 1000) < roleDelay )){
                return
                } else{
                  console.log(m.user.username, "Giving role Insignia (features)");
                  m.roles.add(guild.roles.cache.get(roleInsignia));
                  timerRole["role"] = Date.now();
              }
            }
          }
        })

        m._roles.forEach(roleId => {
          var includesRole = 0;
          if(roleId == roleLvl){
            includesRole = 0;
            m._roles.forEach(roleId => {
              const role = guild.roles.cache.get(roleId);
              if(role.name.includes("✮")){
                includesRole += 1;
              }
            })
            if(includesRole == 0){
              console.log(m.user.username, "Removing role Lvl (features)");
              m.roles.remove(guild.roles.cache.get(roleLvl));
            }
          }
          if(roleId == roleDivMain){
            includesRole = 0;
            m._roles.forEach(roleId => {
              const role = guild.roles.cache.get(roleId);
              if(role.name.includes("『")){
                includesRole += 1;
              }
            })
            if(includesRole == 0){
              console.log(m.user.username, "Removing role DivMain (features)");
              m.roles.remove(guild.roles.cache.get(roleDivMain));
            }
          }
          if(roleId == roleStaff){
            includesRole = 0;
            m._roles.forEach(roleId => {
              const role = guild.roles.cache.get(roleId);
              if(role.name.includes("🏳")){
                includesRole += 1;
              }
            })
            if(includesRole == 0){
              console.log(m.user.username, "Removing role Staff (features)");
              m.roles.remove(guild.roles.cache.get(roleStaff));
            }
          }
          if(roleId == roleInsignia){
            includesRole = 0;
            m._roles.forEach(roleId => {
              const role = guild.roles.cache.get(roleId);
              if(role.name.includes("🎖")){
                includesRole += 1;
              }
            })
            if(includesRole == 0){
              console.log(m.user.username, "Removing role Insignia (features)");
              m.roles.remove(guild.roles.cache.get(roleInsignia));
            }
          }
        })

      }catch(e){console.e}      
    })}).catch(console.error);
  }catch(e){console.log(e)}
  }

  everyMinute();
  every15Minutes();
  memberCounter();
  divRoles();
  var loop1 = setInterval(function(){ everyMinute(); }, 60000*1);
  var loop2 = setInterval(function(){ every15Minutes(); }, 60000*15);
  var loop3 = setInterval(function(){ memberCounter(); }, 60000*10);
  var loop3 = setInterval(function(){ divRoles(); }, 60000*0.5);
}

async function commands(client, message, prefix, guildid){
  try{
  if(!message.content.startsWith(prefix)) return;
  var msg = message.content.split(" ");
  msg = msg.filter((a) => a);

  if(msg[0] == "/callname" || msg[0] == "/renomear" || msg[0] == "/rename"){
    //Check channel
    if(message.channel.id !== "771257420470157322") return;

    console.log("New command! (features)");
    console.log(msg);
    const guild = client.guilds.cache.get(guildid)
    guild.members.fetch(message.author.id).then(user => {
      if(memberLevel(user) < 50) return message.reply({content: "Para usar esse comando você precisa ser LvL 50 aqui no servidor. Para saber como verificar seu nível leia o canal <#768686751291408424>."}).catch();
      const vChannel = message.member.voice.channel;
      if (!vChannel) return message.reply({content: "Entre em um canal para poder trocar o nome dele!"}).catch();
      if(vChannel.parentId !== "720275637415182420") return message.reply({content: "Entre em um canal válido para renomea-lo!"}).catch();
      if(!vChannel.name.includes("┊")) return message.reply({content: "Entre em um canal válido para renomea-lo!"}).catch();
      if(!msg[1]) return message.reply({content: "Para trocar o nome do canal de voz mande **/callname (emoji) (nome)**. "}).catch();
      if(timer[vChannel.id] && (((Date.now()-timer[vChannel.id]) / 1000) <= 300 )) return message.reply({content: "O Discord só permite a troca do nome do canal a cada 5 minutos. Tente renomear outro canal de voz ou aguarde e tente novamente em **" + parseInt(300 - ((Date.now()-timer[vChannel.id]) / 1000)) + " segundos** para poder alterar o nome desse!" }).catch();

      //Emoji and text
      var match = msg[1].match(regex);
      if(!match) {
        match = get_random(allEmojis).match(regex);
        var text = msg;
        text.shift();
      } else{
        var text = msg;
        text.shift();
        text.shift();
      }
      const emojiarray = match[0];
      const emoji = [...emojiarray][0];

      //Text
      text = text.join(" ");
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

  if(msg[0] == "/crole" || msg[0] == "/cr" || msg[0] == "/createrole" || msg[0] == "/creater"){
    if(message.channel.id !== "771257420470157322") return;
    if(message.author.id !== process.env["ownerid"]) return message.reply({content: "Apenas um administrador do BOT pode usar esse comando."}).catch();

    const guild = client.guilds.cache.get(guildid);

    var args = msg;
    args.shift();

    var memberGiftedId = null;

    if(args[0].startsWith("<@!")){
      memberGiftedId = args[0].replace("<@!", "").replace(">", "");
      args.shift();
    }

    name = cFL(args.join(" "));
    name = "🎖"+name

    var position = guild.roles.cache.get(roleInsignia).position;

    console.log(name, position, "created! (features)");

    guild.roles.create({
      name: name,
      color:  randomColor({ luminosity: 'bright' }),
      position: position,
      reason: 'Create a insignia role!',
    }).then(role => {
      message.reply({content: `Criado com sucesso o emblema <@&${role.id}>`}).catch();
      if(memberGiftedId !== null){
        guild.members.fetch(memberGiftedId).then(member => {
          member.roles.add(role).then(function(){
            message.reply({content: `O novo emblema <@&${role.id}> foi fornecido à <@${memberGiftedId}>`}).catch();
          }).catch(console.error);
        }).catch(console.error);
      }
    }).catch(console.error);
  }

  if(msg[0] == "/poi" || msg[0] == "/nr" || msg[0] == "/parouimpar" || msg[0] == "/novarodada"){
    try{
    async function round(){
      if(message.channel.id !== "771257420470157322") return;
      if(!message.member._roles.includes("911416704935022592")) return message.reply({content: `Você precisa ser um <@&911416704935022592> para poder iniciar uma nova rodada de Par Ou Ímpar.`});
      if(timerPoi["newRound"] && (((Date.now()-timerPoi["newRound"]) / 1000) < 50 )) return message.reply({content: `Aguarde mais ${parseInt(50 - ((Date.now()-timerPoi["newRound"]) / 1000))} segundos para iniciar uma nova rodada de Par Ou Ímpar.`});

      var args = msg;
      args.shift();

      if(!args[0])  return message.reply({content: `Por favor mencione o jogador numero 1 (PAR) e em seguida o jogador numero 2 (ÍMPAR) para iniciar uma nova rodada.`});
      if(!args[0].startsWith("<@!")) return message.reply({content: `Por favor mencione o jogador numero 1 (PAR) e em seguida o jogador numero 2 (ÍMPAR) para iniciar uma nova rodada.`});
      var player1id = msg[0].replace("<@!", "").replace(">", "");
      if(!args[1]) return message.reply({content: `Por favor mencione o jogador numero 2 (ÍMPAR) para iniciar uma nova rodada.`});
      if(!args[1].startsWith("<@!")) return message.reply({content: `Por favor mencione o jogador numero 2 (ÍMPAR) para iniciar uma nova rodada.`});
      var player2id = msg[1].replace("<@!", "").replace(">", "");

      const guild = client.guilds.cache.get(guildid);
      timerPoi["newRound"] = Date.now();
      const delay = ms => new Promise(res => setTimeout(res, ms));

      player1 = await guild.members.fetch(player1id).catch(console.error);
      player2 = await guild.members.fetch(player2id).catch(console.error);

      message.reply({content: `Nova rodada iniciada! ${player1.user.username} como PAR e ${player2.user.username} como ÍMPAR.`});
      var datapoi = {};
      datapoi["text"] = "";
      datapoi.text = `Nova rodada!<br>${player1.user.username.toUpperCase()} vs ${player2.user.username.toUpperCase()}`
      saveData("./poi/poi.json", datapoi);

      await delay(5000);
      timerPoi["newRoundStart"] = Date.now();
      player1.send({content: `Desconsidere essa mensagem caso você não esteja em uma rodada de Par Ou Ímpar do Grupo Disparate, provavelmente foi um engano do organizador da rodada!\n\n**Você é o jogador numero 1 ou seja, PAR, dessa rodada de Par Ou Ímpar, envie um numero de 1 a 10 em até 30 segundos! (Vai valer o ultimo numero que você enviou dentro do periodo permitido)**`});
      player2.send({content: `Desconsidere essa mensagem caso você não esteja em uma rodada de Par Ou Ímpar do Grupo Disparate, provavelmente foi um engano do organizador da rodada!\n\n**Você é o jogador numero 2 ou seja, ÍMPAR, dessa rodada de Par Ou Ímpar, envie um numero de 1 a 10 em até 30 segundos para participar! (Vai valer o ultimo numero que você enviou dentro do periodo permitido)**`});
      
      datapoi.text = `Aguardando resposta dos jogadores!<br>30`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>29`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>28`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>27`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>26`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>25`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>24`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>23`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>22`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>21`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>20`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>19`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>18`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>17`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>16`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>15`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>14`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>13`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>12`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>11`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>10`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>9`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>8`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>7`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>6`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>5`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>4`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>3`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>2`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>1`
      saveData("./poi/poi.json", datapoi);
      await delay(1000);
      datapoi.text = `Aguardando resposta dos jogadores!<br>0`
      saveData("./poi/poi.json", datapoi);
      timerPoi["newRoundEnd"] = Date.now();
      await delay(1000);
      datapoi.text = `Fim do prazo de resposta!<br>Computando resultado!`
      saveData("./poi/poi.json", datapoi);
      await delay(4000);

      var player1LM = player1.user.dmChannel.lastMessage;
      var player2LM = player2.user.dmChannel.lastMessage;

      if((player1LM.createdTimestamp < timerPoi["newRoundStart"]) || (player1LM.createdTimestamp > timerPoi["newRoundEnd"])) return message.reply({content: `O jogador ${player1.user.username} enviou um numero fora do prazo de 10 segundos.`});
      if((player2LM.createdTimestamp < timerPoi["newRoundStart"]) || (player2LM.createdTimestamp > timerPoi["newRoundEnd"])) return message.reply({content: `O jogador ${player2.user.username} enviou um numero fora do prazo de 10 segundos.`});

      if(player1LM.author.bot){
        message.reply({content: `O jogador ${player1.user.username} não enviou um numero.`});
        datapoi.text = `Jogador ${player1.user.username} não fez uma jogada<br>Fim da rodada!`
        saveData("./poi/poi.json", datapoi);
        await delay(2000);
        throw "ok";
      }
      if(player2LM.author.bot){
        message.reply({content: `O jogador ${player2.user.username} não enviou um numero.`});
        datapoi.text = `Jogador ${player2.user.username} não fez uma jogada<br>Fim da rodada!`
        saveData("./poi/poi.json", datapoi);
        await delay(2000);
        throw "ok";
      }

      var player1Msg = player1LM.content.replace(" ", "");
      var player2Msg = player2LM.content.replace(" ", "");
      var player1Value = null;
      var player2Value = null;

      if((parseInt(player1Msg) <= 10) && (parseInt(player1Msg) >= 1)){
        player1Value = parseInt(player1Msg);
      }else{
        message.reply({content: `O jogador ${player1.user.username} enviou um numero invalido: "${player1Msg}"`});
        datapoi.text = `Numero invalido de ${player1.user.username}<br>Fim da rodada!`
        saveData("./poi/poi.json", datapoi);
        await delay(2000);
        throw "ok";
      }
      if((parseInt(player2Msg) <= 10) && (parseInt(player2Msg) >= 1)){
        player2Value = parseInt(player2Msg);
      }else{
        message.reply({content: `O jogador ${player2.user.username} enviou um numero invalido: "${player1Msg}"`});
        datapoi.text = `Numero invalido de ${player2.user.username}<br>Fim da rodada!`
        saveData("./poi/poi.json", datapoi);
        await delay(2000);
        throw "ok";
      }

      var evenOrOdd = isOdd(player1Value+player2Value);
      if(evenOrOdd == 0){
        //Par
        datapoi.text = `${player1.user.username} ganhou!<br>${player1.user.username}: ${player1Value} + ${player2Value} :${player2.user.username}<br>${player1Value+player2Value} é par!`
        saveData("./poi/poi.json", datapoi);
        message.reply({content: `Fim da rodada!`});
        await delay(10000);
      }
      if(evenOrOdd == 1){
        //Impar
        datapoi.text = `${player2.user.username} ganhou!<br>${player1.user.username}: ${player1Value} + ${player2Value} :${player2.user.username}<br>${player1Value+player2Value} é ímpar!`
        saveData("./poi/poi.json", datapoi);
        message.reply({content: `Fim da rodada!`});
        await delay(10000);
      }
    }

    await round();
    console.log("End of round (features)");
    saveData("./poi/poi.json", {"text": "Aguardando rodada..."});
    }catch(e){
      saveData("./poi/poi.json", {"text": "Aguardando rodada..."});
      console.log("End of round error (features)");
      if(e !== "ok") {
        message.reply({content: `Foi detectado um erro de codigo 0 durante a execução do comando, pedimos desculpas pelo incoveniente! Tente novamente em alguns segundos por favor.`});
        console.log(e);
      }
    }
  }

  }catch(e){console.log(e)}
}

module.exports = {
    callName: callName,
    commands: commands
};