const fs = require('fs')

function createFile(datafile){
  fs.writeFileSync(("./"+datafile), ("{}"));
}

function loadData(datafile){
  if (!fs.existsSync("./"+(datafile))){
    console.log("Criando arquivo!");
    createFile(datafile)
  }
  return JSON.parse(fs.readFileSync("./"+(datafile), 'utf8'));
}

function saveData(datafile, data){
  fs.writeFileSync("./"+(datafile), JSON.stringify(data, null, 2));
  console.log("Saved!")
}

module.exports = {
    createFile: createFile,
    loadData: loadData,
    saveData: saveData
};