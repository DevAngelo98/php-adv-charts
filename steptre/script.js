$(document).ready(init);

function init(){
  var level = $(".container").attr("data-param");
  getData(level);
}

function getData(level){
  $.ajax({
    url: "getAllData.php",
    method: "GET",
    data: {
      level: level 
    },
    success: function(data){
      graphs(data,level);
    },
    error: function(err){
      console.log("error: ", err);
    }
  });
}

function graphs(data,level) {
  if(level=="guest"){
    fatturato(data);
    $("#agent").parent().remove();
    $("#clevel").parent().remove();
  } else if (level=="employee" || level=="clevel" ){
    if(level=="employee"){
      $("#clevel").parent().remove();
    }
    fatturato(data);
    fatturatoByAgent(data);
    if(level=="clevel"){
      efficienza(data);
    } 
  }
}

function printGraphs(id, type, labels, label, data,background,border ){
  var ctx = document.getElementById(id).getContext('2d');
  new Chart(ctx, {
      type: type,
      data: {
          labels: labels,
          datasets: [{
            label: label,
            data: data,
            backgroundColor: background,
            borderColor: border,
          }]
      }
  });
}

function fatturato(graphs){
  printGraphs(
    'myChart',
    graphs.fatturato.type,
    moment.months(),
    'Vendite',
    graphs.fatturato.data,
    colorBack(),
    colorBorder(),
  )
}

function fatturatoByAgent(graphsAgent){
  var getLabels = Object.keys(graphsAgent.fatturato_by_agent.data);
  var getData = Object.values(graphsAgent.fatturato_by_agent.data);
  printGraphs(
    'agent', 
    graphsAgent.fatturato_by_agent.type,
    getLabels, 
    "", 
    getData,
    "yellow",
    "red"
  )
}

function efficienza(dataTeam){
  var ctx = document.getElementById('clevel').getContext('2d');
  new Chart(ctx, {
      type: dataTeam.team_efficiency.type,
      data: {
        labels: moment.months(),
        datasets: getTeam(dataTeam.team_efficiency.data)
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });
}

function colorBack(){
  var backgroundColor=[];
  for(var i=0; i<12; i++){
    backgroundColor.push('rgba(0, 128, 0, 0.7)');
  }
  return backgroundColor;
}

function colorBorder(){
  var borderColor=[];
  for(var i=0; i<12; i++){
    borderColor.push('black');
  }
  return borderColor;
}

function getTeam(team){
  var arrayTeam = [];
  var nomeTeam = Object.keys(team);
  var valoreTeam = Object.values(team);
  
  for(var i=0; i<nomeTeam.length;i++){
    var teamTemp = {
      "label": nomeTeam[i],
      "data": valoreTeam[i],
      "borderColor": getRandomColor()
    };
    arrayTeam.push(teamTemp);
  }

  return arrayTeam;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
