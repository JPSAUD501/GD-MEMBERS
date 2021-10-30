const {timeToString, birthday, daysToBday, age, sinceDays} = require("./moment");
const fs = require('fs')
const moment = require('moment');
moment.locale('pt-br');


const lvl01 = "728073881725829182";
const lvl10 = "768683585581350932";
const lvl20 = "728072500801568853";
const lvl30 = "728076146046140486";
const lvl40 = "771066884136894484";
const lvl50 = "771067779742040134";
const lvl60 = "790490003116654602";
const lvl70 = "790491464584265798";
const lvl80 = "795537757564829716";
const lvl90 = "795537854415110174";
const lvl100 = "795538070707240992";
const lvl110 = "826153614581694504";
const lvl120 = "830948266672783381";
const lvl130 = "830948556885721148";
const lvl140 = "830948577793671228";
const lvl150 = "830948584152367104";
const lvl160 = "830948589168885800";
const lvl170 = "830948593241817088";
const lvl180 = "830948598510256159";
const lvl190 = "830948602649640990";
const lvl200 = "830948607061786674";


function createFile(datafile){
  fs.writeFileSync(("./"+datafile), ("{}"));
}

function loadData(datafile){
  if (!fs.existsSync("./"+(datafile))){
    console.log("Criando arquivo!");
    createFile(datafile)
    let datajson = JSON.parse(fs.readFileSync("./"+(datafile), 'utf8'));
    saveData(datafile, datajson);
    let datajson2 = JSON.parse(fs.readFileSync("./"+(datafile), 'utf8'));
    return datajson2;
  } else{
    let datajson = JSON.parse(fs.readFileSync("./"+(datafile), 'utf8'));
    return datajson;
  }
}

function saveData(datafile, data){
  fs.writeFileSync("./"+(datafile), JSON.stringify(data, null, 2));
  console.log("Saved s1!")
  var dataverify = loadData(datafile);
  fs.writeFileSync("./"+(datafile), JSON.stringify(dataverify, null, 2));
  console.log("Saved s2!")
}

function memberLevel(member){
  if(member.user.id == process.env["ownerid"]){
    return 200;
  } else if(member._roles.includes(lvl01)){
    return 1;
  } else if(member._roles.includes(lvl10)){
    return 10;
  } else if(member._roles.includes(lvl20)){
    return 20;
  } else if(member._roles.includes(lvl30)){
    return 30;
  } else if(member._roles.includes(lvl40)){
    return 40;
  } else if(member._roles.includes(lvl50)){
    return 50;
  } else if(member._roles.includes(lvl60)){
    return 60;
  } else if(member._roles.includes(lvl70)){
    return 70;
  } else if(member._roles.includes(lvl80)){
    return 80;
  } else if(member._roles.includes(lvl90)){
    return 90;
  } else if(member._roles.includes(lvl100)){
    return 100;
  } else if(member._roles.includes(lvl110)){
    return 110;
  } else if(member._roles.includes(lvl120)){
    return 120;
  } else if(member._roles.includes(lvl130)){
    return 130;
  } else if(member._roles.includes(lvl140)){
    return 140;
  } else if(member._roles.includes(lvl150)){
    return 150;
  } else if(member._roles.includes(lvl160)){
    return 160;
  } else if(member._roles.includes(lvl170)){
    return 170;
  } else if(member._roles.includes(lvl180)){
    return 180;
  } else if(member._roles.includes(lvl190)){
    return 190;
  } else if(member._roles.includes(lvl200)){
    return 200;
  } else {
    return 0;
  }
}

function updateMemberData(member, data, datafile, botrelease, fusotime, guildid, client, memberCounterNumber){

      function restoreMemberData(name){
        dataf = loadData(datafile)
         if(name in dataf.memberList[member.user.id]){
          return (dataf.memberList[member.user.id])[name];
        }else{
          return null;
        }
      }

      function pointsMaxLvl(member){
                 if(member._roles.includes(lvl01)){
            return 0;
          } else if(member._roles.includes(lvl10)){
            return 1;
          } else if(member._roles.includes(lvl20)){
            return 1;
          } else if(member._roles.includes(lvl30)){
            return 1;
          } else if(member._roles.includes(lvl40)){
            return 2;
          } else if(member._roles.includes(lvl50)){
            return 2;
          } else if(member._roles.includes(lvl60)){
            return 3;
          } else if(member._roles.includes(lvl70)){
            return 3;
          } else if(member._roles.includes(lvl80)){
            return 4;
          } else if(member._roles.includes(lvl90)){
            return 4;
          } else if(member._roles.includes(lvl100)){
            return 5;
          } else if(member._roles.includes(lvl110)){
            return 5;
          } else if(member._roles.includes(lvl120)){
            return 6;
          } else if(member._roles.includes(lvl130)){
            return 6;
          } else if(member._roles.includes(lvl140)){
            return 7;
          } else if(member._roles.includes(lvl150)){
            return 7;
          } else if(member._roles.includes(lvl160)){
            return 8;
          } else if(member._roles.includes(lvl170)){
            return 8;
          } else if(member._roles.includes(lvl180)){
            return 8;
          } else if(member._roles.includes(lvl190)){
            return 8;
          } else if(member._roles.includes(lvl200)){
            return 8;
          } else {
            return 0;
          }
      }

      if(!("memberList" in data)) {
        data["memberList"] = {};
        console.log("Creating member list (data)");
        saveData(datafile, data);
      }

      if(!(member.user.id in data.memberList)) {
        data.memberList[member.user.id] = {};
        saveData(datafile, data);
        console.log("Creating new member data in json (data)");
      }

      if(restoreMemberData("authorized") == null){
        if(member._roles.includes("721660842176806965")){
          data.memberList[member.user.id].authorized = true;
          console.log("Authorized = null uptadating to true (data)");
          saveData(datafile, data);
        } else{
          data.memberList[member.user.id].authorized = false;
          console.log("Authorized = null uptadating to false (data)");
          saveData(datafile, data);
        }
      }

      if((member.joinedTimestamp < botrelease) || member.user.bot){
        if(restoreMemberData("authorized") !== true || restoreMemberData("legacyMember") !== true) {
          data.memberList[member.user.id].authorized = true;
          data.memberList[member.user.id].authorizedById = "141957307591426050";
          data.memberList[member.user.id].authorizedByName = "JPSAUD501";
          data.memberList[member.user.id].legacyMember = true;
          console.log("Legacy member or bot detected (data)");
          saveData(datafile, data);
        }
      } else if(restoreMemberData("authorized") == true && (restoreMemberData("authorizedById") == null)){
        data.memberList[member.user.id].authorizedById = client.user.id;
        data.memberList[member.user.id].authorizedByName = client.user.username;
        data.memberList[member.user.id].legacyMember = false;
        console.log("Member missing authorizedById updating to bot id and name (data)");
        saveData(datafile, data);
      } else if(restoreMemberData("legacyMember") !== false){
        data.memberList[member.user.id].legacyMember = false;
        console.log("Not legacyMember (data)");
        saveData(datafile, data);
      }

      if(sinceDays(member.joinedTimestamp, fusotime) == null){
        if(restoreMemberData("pointsMax") !== pointsMaxLvl(member)){
          data.memberList[member.user.id].pointsMax = pointsMaxLvl(member);
          data.memberList[member.user.id].points = pointsMaxLvl(member);
          console.log("1 - Updating points and pointsMax (data)")
          saveData(datafile, data);
        }
      } else if(sinceDays(member.joinedTimestamp, fusotime) >= 15){
        if(restoreMemberData("pointsMax") !== (pointsMaxLvl(member) + 2)){
          data.memberList[member.user.id].pointsMax = (pointsMaxLvl(member) + 2);
          console.log("2 - Updating pointsMax (data)")
          saveData(datafile, data);
        }
      } else if(sinceDays(member.joinedTimestamp, fusotime) >= 1){
        if(restoreMemberData("pointsMax") !== (pointsMaxLvl(member) + 1)){
          data.memberList[member.user.id].pointsMax = (pointsMaxLvl(member) + 1);
          console.log("3 - Updating pointsMax (data)")
          saveData(datafile, data);
        }
      } else {
        if((restoreMemberData("pointsMax") !== pointsMaxLvl(member))){
          data.memberList[member.user.id].pointsMax = pointsMaxLvl(member);
          data.memberList[member.user.id].points = pointsMaxLvl(member);
          console.log("4 - Updating points and pointsMax (data)")
          saveData(datafile, data);
        }
      }

      if(restoreMemberData("pointsLastDayUpdate") !== moment(Date.now()+fusotime).format('DD/MM/YYYY')){
        data.memberList[member.user.id].pointsLastDayUpdate = moment(Date.now()+fusotime).format('DD/MM/YYYY');
        if(restoreMemberData("points") !==  null){
          if(restoreMemberData("points") < restoreMemberData("pointsMax")){
            data.memberList[member.user.id].points = restoreMemberData("points") + 1;
          }
        } else{
          data.memberList[member.user.id].points = restoreMemberData("pointsMax");
        }
        console.log("Updating pointsLastDayUpdate and points (data)")
        saveData(datafile, data);
      }

      if(restoreMemberData("points") == null){
        data.memberList[member.user.id].points = restoreMemberData("pointsMax");
        console.log("Updating null points (data)")
        saveData(datafile, data);
      }

      if(restoreMemberData("points") > restoreMemberData("pointsMax")){
        data.memberList[member.user.id].points = restoreMemberData("pointsMax");
        console.log("Points > PointsMax - Updating to max (data)")
        saveData(datafile, data);
      }

      var memberdata = {
         "id": member.user.id,
         "user": member.user.username,
         "noob": (!member._roles.includes("721660842176806965")) ,
         "bot": member.user.bot,
         "birthday": birthday(member.joinedTimestamp, fusotime),
         "lastBdayMsg": restoreMemberData("lastBdayMsg"),
         "age": age(member.joinedTimestamp, fusotime),
         "memberSinceDays": sinceDays(member.joinedTimestamp, fusotime),
         "memberSincePlusTime": sinceDays(member.joinedTimestamp, fusotime) + parseFloat(0.235959 - parseFloat(moment(member.joinedTimestamp+fusotime).format('HHmmss'))/1000000),
         "daysToBday": daysToBday(member.joinedTimestamp, fusotime),
         "joinTimeUnix": member.joinedTimestamp,
         "joinDate": moment(member.joinedTimestamp+fusotime).format('DD/MM/YYYY'),
         "joinTime": moment(member.joinedTimestamp+fusotime).format('HH:mm:ss'),
         "joinString": timeToString(member.joinedTimestamp, fusotime),
         "authorized": restoreMemberData("authorized"),
         "authorizedTimeUnix": restoreMemberData("authorizedTimeUnix"),
         "authorizedById": restoreMemberData("authorizedById"),
         "authorizedByName": restoreMemberData("authorizedByName"),
         "pointsMax": restoreMemberData("pointsMax"),
         "points": restoreMemberData("points"),
         "pointsLastDayUpdate": restoreMemberData("pointsLastDayUpdate"),
         "legacyMember": restoreMemberData("legacyMember"),
         "avatarUrl": member.displayAvatarURL(),
         "msgId": restoreMemberData("msgId"),
         "gdmId": memberCounterNumber
      } 

    if (JSON.stringify(memberdata) !== JSON.stringify(data.memberList[member.user.id])) {
      data.memberList[member.user.id] = memberdata;
      console.log("Updating member data (data)");
      saveData(datafile, data);
    }
    
    if(memberdata.authorized == true && !member._roles.includes("721660842176806965") && !member._roles.includes("721650485131477005")){
      console.log("Add MEMBER role to member! (data)");
      var role = member.guild.roles.cache.get("721660842176806965");
      member.roles.add(role);
    }
  }

module.exports = {
    createFile: createFile,
    loadData: loadData,
    saveData: saveData,
    memberLevel: memberLevel,
    updateMemberData: updateMemberData
};