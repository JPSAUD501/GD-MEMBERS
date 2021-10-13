const {saveData} = require("./data");

function deleteFromList(datafile, data, guild){
  var id = Object.keys(data.memberList);
  var membros = [];
  guild.members.cache.each(member => {
    membros.push(member.id);
  })
  for (const n in id){
    if (!membros.includes(id[n])) {
      console.log(data.memberList[id[n]]);
      delete data.memberList[id[n]];
      saveData(datafile, data)
    }
  }
}

module.exports = {
    deleteFromList: deleteFromList
};