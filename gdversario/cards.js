
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
      console.log(data);
      var list = Object.keys(data.memberList);
      var conteudo = "";
      for (const i in list){
        var member = data.memberList[list[i]]
        console.log(member.user)
        if (member.user.includes(user.toString())){
            conteudo += "<div class=\"card\">" +
                        "<div class=\"main-card\">" +
                        "<div class=\"avatar-card\">" +
                        "<img src=\"" + member.avatarUrl + "\"alt=\"Avatar do GD\" class=\"profile-avatar\">" + "</div>" +
                        "<div class=\"name-card\">" +
                        "<h1 class=\"profile-name\">" + member.user + "</h1>" + "</div>" +
                        "</div>" + "<div class=\"statistic\">" +
                        "<table class=\"table-statistic\">" + "<tr>" +
                        "<th>Entrou</th>" + "<td>" + member.joinDate + " as " + member.joinTime + "</td>" +
                        "</tr>" + "<tr>" + "<th>Fazem</th>" + "<td>" + member.memberSinceDays + "</td>" +
                        "</tr>" + "<tr>" + "<th>Faltam</th>" + "<td>" + member.daysToBday + "</td>" +
                        "</tr>" + "</table>" + "</div>" + "</div>";
            conteudo += "</div>";
        }
    }
    $(".main-area").html(conteudo);
    });
}


//txt += `<a href=\"${member.avatarUrl}\"><img border=\"0\" alt=\"${member.user}\" src=\"${member.avatarUrl}\" width=\"100\" height=\"100\"></a><br>` +"Membro: \"" + member.user + "\"<br>Faltam: " + member.daysToBday + " dias" + "<br>Entrou: " + member.joinString + "<br>Há: " + member.memberSinceDays + " dias" + "<br><br>";



/*



"<div class="card">" +
"<div class="main-card">" +
"<div class="avatar-card">" +
"<img src= + member.avatarUrl + alt="Avatar do GD" class="profile-avatar">" + "</div>" +
"<div class="name-card">" +
"<h1 class="profile-name">" + member.user + "</h1>" + "</div>" +
"</div>" + "<div class="statistic">" +
"<table class="table-statistic">" + "<tr>" +
"<th>Entrou</th>" + "<td>" + member.joinString + "</td>" +
"</tr>" + "<tr>" + "<th>Fazem</th>" + "<td>" + member.memberSinceDays + "</td>" +
"</tr>" + "<tr>" + "<th>Faltam</th>" + "<td>" + member.daysToBday + "</td>" +
"</tr>" + "</table>" + "</div>" + "</div>"




                
            conteudo += "<div class='card' id='"+ member.user + "'>" + "div class="avatar-card" +
                        "<img src='" + {member.avatarUrl} + "' class='imagem'>" +
                        "<div id='nome'>" +  detran[i].user + "</div>" + 
                        "<div class='info'>" +
                        "<strong>Placa: </strong> " + detran[i].placa+"<br>" +
                        "<strong>CNH: </strong> " + detran[i].cnh+"<br>" + 
                        "<strong>Gravidade: </strong> " + detran[i].gravidade+"<br>" + 
                        "<strong>Pontos: </strong> " + detran[i].pontos+"<br>" + 
                        "<strong>Data: </strong>" + detran[i].data_infracao+"<br>" + 
                        "</div>" +
                        "<div class='valormulta'><strong>Valor: </strong>" + detran[i].valor + "</div>";
                        */