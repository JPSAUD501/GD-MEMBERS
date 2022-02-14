async function html(){
    return `
    <html>
    <head>
      <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet">  
      
      <style>
        body {
          font-family: 'Poppins', sans-serif;
          width: 1800px;
          height: 900px;
          overflow: hidden;
        }
        .e1_4 { 
          background-color:rgba(52, 29, 191, 1);
          width:1800px;
          height:900px;
          position:absolute;
        }
        .e1_7 { 
          background-color:rgba(52, 29, 191, 1);
          width:1800px;
          height:900px;
          position:absolute;
          left:0px;
          top:0px;
        }
        .e9_4 { 
          border-radius:500px;
          background-color:{{color1}};
          width:630px;
          height:630px;
          position:absolute;
          left:1429px;
          top:-254px;
        }
        .e9_3 { 
          border-radius:500px;
          background-color:{{color2}};
          width:558px;
          height:558px;
          position:absolute;
          left:562px;
          top:551px;
        }
        .e9_2 { 
          border-radius:500px;
          background-color:{{color3}};
          width:813px;
          height:813px;
          position:absolute;
          left:-191px;
          top:-167px;
        }
        .e1_5 { 
          width:626px;
          height:500px;
          position:absolute;
          left:931px;
          top:338px;
          border-top-left-radius:100px;
          border-top-right-radius:100px;
          border-bottom-left-radius:100px;
          border-bottom-right-radius:100px;
          background-image:url({{imageUrl}});
          background-repeat:no-repeat;
          background-size:cover;
          background-position:center;
        }
        .e6_20 { 
          background-color:rgba(52, 29, 191, 1);
          width:539px;
          height:357px;
          position:absolute;
          left:1285px;
          top:575px;
          border-top-left-radius:100px;
          border-top-right-radius:100px;
          border-bottom-left-radius:100px;
          border-bottom-right-radius:100px;
        }
        .e1_6 { 
          width:394px;
          height:329px;
          position:absolute;
          left:1318px;
          top:534px;
          background-image:url(https://raw.githubusercontent.com/JPSAUD501/FILES/master/logo.png);
          background-repeat:no-repeat;
          background-size:cover;
        }
        .e1_9 { 
          color:rgba(255, 255, 255, 1);
          width:1663px;
          height:339px;
          position:absolute;
          left:71px;
          top:100px;
          font-family:Poppins;
          font-weight: bolder;
          text-align:left;
          font-size:175px;
          letter-spacing:0;
        }
        .e1_11 { 
          color:rgba(255, 255, 255, 1);
          width:931px;
          height:379px;
          position:absolute;
          left:67px;
          top:77px;
          text-align:left;
          font-size:50px;
          letter-spacing:0;
          font-family: Poppins;
        }
      </style>
    </head>
    
    <body>
      <div class=e1_4><div  class="e1_7"></div><div  class="e9_4"></div><div  class="e9_3"></div><div  class="e9_2"></div><div  class="e1_5"></div><div  class="e6_20"></div><div  class="e1_6"></div><span  class="e1_9">{{name}}</span><span  class="e1_11">Bem vindo ao Grupo Disparate</span></div>
    </body>
  </html>
    `;
}

module.exports = {
    html: html
};