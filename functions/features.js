const allEmojis = ["😀","😁","😂","😃","😄","😅","😆","😇","😈","👿","😉","😊","☺️","😋","😌","😍","😎","😏","😐","😑","😒","😓","😔","😕","😖","😗","😘","😙","😚","😛","😜","😝","😞","😟","😠","😡","😢","😣","😤","😥","😦","😧","😨","😩","😪","😫","😬","😭","😮","😯","😰","😱","😲","😳","😴","😵","😶","😷","😸","😹","😺","😻","😼","😽","😾","😿","🙀","👣","👤","👥","👶","👶🏻","👶🏼","👶🏽","👶🏾","👶🏿","👦","👦🏻","👦🏼","👦🏽","👦🏾","👦🏿","👧","👧🏻","👧🏼","👧🏽","👧🏾","👧🏿","👨","👨🏻","👨🏼","👨🏽","👨🏾","👨🏿","👩","👩🏻","👩🏼","👩🏽","👩🏾","👩🏿","👪","👨‍👩‍👧","👨‍👩‍👧‍👦","👨‍👩‍👦‍👦","👨‍👩‍👧‍👧","👩‍👩‍👦","👩‍👩‍👧","👩‍👩‍👧‍👦","👩‍👩‍👦‍👦","👩‍👩‍👧‍👧","👨‍👨‍👦","👨‍👨‍👧","👨‍👨‍👧‍👦","👨‍👨‍👦‍👦","👨‍👨‍👧‍👧","👫","👬","👭","👯","👰","👰🏻","👰🏼","👰🏽","👰🏾","👰🏿","👱","👱🏻","👱🏼","👱🏽","👱🏾","👱🏿","👲","👲🏻","👲🏼","👲🏽","👲🏾","👲🏿","👳","👳🏻","👳🏼","👳🏽","👳🏾","👳🏿","👴","👴🏻","👴🏼","👴🏽","👴🏾","👴🏿","👵","👵🏻","👵🏼","👵🏽","👵🏾","👵🏿","👮","👮🏻","👮🏼","👮🏽","👮🏾","👮🏿","👷","👷🏻","👷🏼","👷🏽","👷🏾","👷🏿","👸","👸🏻","👸🏼","👸🏽","👸🏾","👸🏿","💂","💂🏻","💂🏼","💂🏽","💂🏾","💂🏿","👼","👼🏻","👼🏼","👼🏽","👼🏾","👼🏿","🎅","🎅🏻","🎅🏼","🎅🏽","🎅🏾","🎅🏿","👻","👹","👺","💩","💀","👽","👾","🙇","🙇🏻","🙇🏼","🙇🏽","🙇🏾","🙇🏿","💁","💁🏻","💁🏼","💁🏽","💁🏾","💁🏿","🙅","🙅🏻","🙅🏼","🙅🏽","🙅🏾","🙅🏿","🙆","🙆🏻","🙆🏼","🙆🏽","🙆🏾","🙆🏿","🙋","🙋🏻","🙋🏼","🙋🏽","🙋🏾","🙋🏿","🙎","🙎🏻","🙎🏼","🙎🏽","🙎🏾","🙎🏿","🙍","🙍🏻","🙍🏼","🙍🏽","🙍🏾","🙍🏿","💆","💆🏻","💆🏼","💆🏽","💆🏾","💆🏿","💇","💇🏻","💇🏼","💇🏽","💇🏾","💇🏿","💑","👩‍❤️‍👩","👨‍❤️‍👨","💏","👩‍❤️‍💋‍👩","👨‍❤️‍💋‍👨","🙌","🙌🏻","🙌🏼","🙌🏽","🙌🏾","🙌🏿","👏","👏🏻","👏🏼","👏🏽","👏🏾","👏🏿","👂","👂🏻","👂🏼","👂🏽","👂🏾","👂🏿","👀","👃","👃🏻","👃🏼","👃🏽","👃🏾","👃🏿","👄","💋","👅","💅","💅🏻","💅🏼","💅🏽","💅🏾","💅🏿","👋","👋🏻","👋🏼","👋🏽","👋🏾","👋🏿","👍","👍🏻","👍🏼","👍🏽","👍🏾","👍🏿","👎","👎🏻","👎🏼","👎🏽","👎🏾","👎🏿","☝","☝🏻","☝🏼","☝🏽","☝🏾","☝🏿","👆","👆🏻","👆🏼","👆🏽","👆🏾","👆🏿","👇","👇🏻","👇🏼","👇🏽","👇🏾","👇🏿","👈","👈🏻","👈🏼","👈🏽","👈🏾","👈🏿","👉","👉🏻","👉🏼","👉🏽","👉🏾","👉🏿","👌","👌🏻","👌🏼","👌🏽","👌🏾","👌🏿","✌","✌🏻","✌🏼","✌🏽","✌🏾","✌🏿","👊","👊🏻","👊🏼","👊🏽","👊🏾","👊🏿","✊","✊🏻","✊🏼","✊🏽","✊🏾","✊🏿","✋","✋🏻","✋🏼","✋🏽","✋🏾","✋🏿","💪","💪🏻","💪🏼","💪🏽","💪🏾","💪🏿","👐","👐🏻","👐🏼","👐🏽","👐🏾","👐🏿","🙏","🙏🏻","🙏🏼","🙏🏽","🙏🏾","🙏🏿","🌱","🌲","🌳","🌴","🌵","🌷","🌸","🌹","🌺","🌻","🌼","💐","🌾","🌿","🍀","🍁","🍂","🍃","🍄","🌰","🐀","🐁","🐭","🐹","🐂","🐃","🐄","🐮","🐅","🐆","🐯","🐇","🐰","🐈","🐱","🐎","🐴","🐏","🐑","🐐","🐓","🐔","🐤","🐣","🐥","🐦","🐧","🐘","🐪","🐫","🐗","🐖","🐷","🐽","🐕","🐩","🐶","🐺","🐻","🐨","🐼","🐵","🙈","🙉","🙊","🐒","🐉","🐲","🐊","🐍","🐢","🐸","🐋","🐳","🐬","🐙","🐟","🐠","🐡","🐚","🐌","🐛","🐜","🐝","🐞","🐾","⚡️","🔥","🌙","☀️","⛅️","☁️","💧","💦","☔️","💨","❄️","🌟","⭐️","🌠","🌄","🌅","🌈","🌊","🌋","🌌","🗻","🗾","🌐","🌍","🌎","🌏","🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘","🌚","🌝","🌛","🌜","🌞","🍅","🍆","🌽","🍠","🍇","🍈","🍉","🍊","🍋","🍌","🍍","🍎","🍏","🍐","🍑","🍒","🍓","🍔","🍕","🍖","🍗","🍘","🍙","🍚","🍛","🍜","🍝","🍞","🍟","🍡","🍢","🍣","🍤","🍥","🍦","🍧","🍨","🍩","🍪","🍫","🍬","🍭","🍮","🍯","🍰","🍱","🍲","🍳","🍴","🍵","☕️","🍶","🍷","🍸","🍹","🍺","🍻","🍼","🎀","🎁","🎂","🎃","🎄","🎋","🎍","🎑","🎆","🎇","🎉","🎊","🎈","💫","✨","💥","🎓","👑","🎎","🎏","🎐","🎌","🏮","💍","❤️","💔","💌","💕","💞","💓","💗","💖","💘","💝","💟","💜","💛","💚","💙","🏃","🏃🏻","🏃🏼","🏃🏽","🏃🏾","🏃🏿","🚶","🚶🏻","🚶🏼","🚶🏽","🚶🏾","🚶🏿","💃","💃🏻","💃🏼","💃🏽","💃🏾","💃🏿","🚣","🚣🏻","🚣🏼","🚣🏽","🚣🏾","🚣🏿","🏊","🏊🏻","🏊🏼","🏊🏽","🏊🏾","🏊🏿","🏄","🏄🏻","🏄🏼","🏄🏽","🏄🏾","🏄🏿","🛀","🛀🏻","🛀🏼","🛀🏽","🛀🏾","🛀🏿","🏂","🎿","⛄️","🚴","🚴🏻","🚴🏼","🚴🏽","🚴🏾","🚴🏿","🚵","🚵🏻","🚵🏼","🚵🏽","🚵🏾","🚵🏿","🏇","🏇🏻","🏇🏼","🏇🏽","🏇🏾","🏇🏿","⛺️","🎣","⚽️","🏀","🏈","⚾️","🎾","🏉","⛳️","🏆","🎽","🏁","🎹","🎸","🎻","🎷","🎺","🎵","🎶","🎼","🎧","🎤","🎭","🎫","🎩","🎪","🎬","🎨","🎯","🎱","🎳","🎰","🎲","🎮","🎴","🃏","🀄️","🎠","🎡","🎢","🚃","🚞","🚂","🚋","🚝","🚄","🚅","🚆","🚇","🚈","🚉","🚊","🚌","🚍","🚎","🚐","🚑","🚒","🚓","🚔","🚨","🚕","🚖","🚗","🚘","🚙","🚚","🚛","🚜","🚲","🚏","⛽️","🚧","🚦","🚥","🚀","🚁","✈️","💺","⚓️","🚢","🚤","⛵️","🚡","🚠","🚟","🛂","🛃","🛄","🛅","💴","💶","💷","💵","🗽","🗿","🌁","🗼","⛲️","🏰","🏯","🌇","🌆","🌃","🌉","🏠","🏡","🏢","🏬","🏭","🏣","🏤","🏥","🏦","🏨","🏩","💒","⛪️","🏪","🏫","⌚️","📱","📲","💻","⏰","⏳","⌛️","📷","📹","🎥","📺","📻","📟","📞","☎️","📠","💽","💾","💿","📀","📼","🔋","🔌","💡","🔦","📡","💳","💸","💰","💎","🌂","👝","👛","👜","💼","🎒","💄","👓","👒","👡","👠","👢","👞","👟","👙","👗","👘","👚","👕","👔","👖","🚪","🚿","🛁","🚽","💈","💉","💊","🔬","🔭","🔮","🔧","🔪","🔩","🔨","💣","🚬","🔫","🔖","📰","🔑","✉️","📩","📨","📧","📥","📤","📦","📯","📮","📪","📫","📬","📭","📄","📃","📑","📈","📉","📊","📅","📆","🔅","🔆","📜","📋","📖","📓","📔","📒","📕","📗","📘","📙","📚","📇","🔗","📎","📌","✂️","📐","📍","📏","🚩","📁","📂","✒️","✏️","📝","🔏","🔐","🔒","🔓","📣","📢","🔈","🔉","🔊","🔇","💤","🔔","🔕","💭","💬","🚸","🔍","🔎","🚫","⛔️","📛","🚷","🚯","🚳","🚱","📵","🔞","🉑","🉐","💮","㊙️","㊗️","🈴","🈵","🈲","🈶","🈚️","🈸","🈺","🈷","🈹","🈳","🈂","🈁","🈯️","💹","❇️","✳️","❎","✅","✴️","📳","📴","🆚","🅰","🅱","🆎","🆑","🅾","🆘","🆔","🅿️","🚾","🆒","🆓","🆕","🆖","🆗","🆙","🏧","♈️","♉️","♊️","♋️","♌️","♍️","♎️","♏️","♐️","♑️","♒️","♓️","🚻","🚹","🚺","🚼","♿️","🚰","🚭","🚮","▶️","◀️","🔼","🔽","⏩","⏪","⏫","⏬","➡️","⬅️","⬆️","⬇️","↗️","↘️","↙️","↖️","🔄","↪️","↩️","⤴️","⤵️","🔀","🔁","🔂","🔟","🔢","🔤","🔡","🔠","📶","🎦","🔣","🔃","💱","💲","➰","➿","〽️","🔚","🔙","🔛","🔝","🔜","🌀","Ⓜ️","⛎","🔯","🔰","🔱","⚠️","♨️","♻️","💢","💠","☑️","⚪️","🕐","🕑","🕒","🕓","🕔","🕕","🕖","🕗","🕘","🕙","🕚","🕛","🕜","🕝","🕞","🕟","🕠","🕡","🕢","🕣","🕤","🕥","🕦","🕧"];
const {loadData, memberLevel} = require("./data");
const {birthday} = require("./moment");
const emojiRegex = require('emoji-regex');
const regex = emojiRegex();
var timer = [];
var timerRole = [];
var roleDelay = 0.5;

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
    var roleLvl = "909711622640115742";
    var roleDivMain = "909710113907023893";
    var roleStaff = "909713172653543454";
    var roleInsignia = "909711093537079346";
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