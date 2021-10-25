$(function() {
  searchMember($("#search").val());
});

$("#sort").change(function () {
  searchMember($("#search").val());
});

$("#search").on("input", function() {
   searchMember($("#search").val());
});

$("#btn").click(function(){
  searchMember($("#search").val());
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

function searchMember(user){
    readTextFile("./data.json", function(text){
      var data = JSON.parse(text);
      var list = Object.keys(data.memberList);
      var listorder = [];
      var conteudo = "";
      var orderby = $("#sort :selected").val();
      for (const i in list){
        listorder.push(data.memberList[list[i]]);
      }
      if (orderby == "bdaymember"){
        listorder.sort(function(a, b){
          return (a["daysToBday"] - b["daysToBday"]);
        });
      } else if (orderby == "newmember"){
        listorder.sort(function(a, b){
          return (a["memberSincePlusTime"] - b["memberSincePlusTime"]);
        });
      } else if (orderby == "oldmember"){
        listorder.sort(function(a, b){
          return (b["memberSincePlusTime"] - a["memberSincePlusTime"]);
        });
      } else {
        listorder.sort(function(a, b){
          return (a["daysToBday"] - b["daysToBday"]) ;
        });
      }
      listorder.forEach(function(member){
        if (member.user.toLowerCase().includes(user.toString().toLowerCase())){
            conteudo += "<div class=\"card\">" +
                        "<div class=\"main-card\">" +
                        "<div class=\"avatar-card\">" +
                        "<a href=\"" + member.avatarUrl + "\"><img src=\"" + member.avatarUrl + "\"alt=\"Avatar do GD\" class=\"profile-avatar\"></a>" + "</div>" +
                        "<div class=\"name-card\">" +
                        "<h1 class=\"profile-name\">" + member.user + "</h1>" + "</div>" +
                        "</div>" + "<div class=\"statistic\">" +
                        "<table class=\"table-statistic\">" + "<tr>" +
                        "<th>Membro desde:</th>" + "<td>" + member.joinDate + " as " + member.joinTime + "</td>" +
                        "</tr>" + "<tr>" + "<th>Autorizado por:</th>" + "<td>" + member.authorizedByName + "</td>" +
                        "</tr>" + "<tr>" + "<th>" + (member.age+1) + "º GDVERSÁRIO em:</th>" + "<td>" + member.daysToBday + " dia(s)" + "</td>" +
                        "</tr>" + "</table>" + "</div>" + "</div>";
            conteudo += "</div>";
        }
    })
    $(".main-area").html(conteudo);
    });
}