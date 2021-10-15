const {saveData} = require("./data");

function deleteFromList(datafile, data, guild){
  var list = Object.keys(data.memberList);
  var membros = [];
  guild.members.cache.each(member => {
    membros.push(member.id);
  })
  for (const i in list){
    if (!membros.includes(list[i])) {
      console.log(data.memberList[list[i]]);
      delete data.memberList[list[i]];
      saveData(datafile, data)
    }
  }
}

module.exports = {
    deleteFromList: deleteFromList
};