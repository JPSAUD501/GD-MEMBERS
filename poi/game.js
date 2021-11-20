$(function() {
  main();
});

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function main(){
  function update(){
    console.log("Update.")
    readTextFile("./poi.json", function(text){
      var data = JSON.parse(text);
      $(".main-area").html(data.text);
    });
  }
  const loop = setInterval(update, 100);
}