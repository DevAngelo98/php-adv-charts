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
      printGraphs(data,level);
    },
    error: function(err){
      console.log("error: ", err);
    }
  });
}

function printGraphs(data,level) {
  if(level=="guest"){
    fatturato(data);
  } else if (level=="employee" || level=="clevel" ){
    fatturato(data);
    fatturatoByAgent(data);
    if(level=="clevel"){
      efficienza(data);
    } 
  }
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

function fatturato(graphs){
  console.log(graphs);
  
  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
      type: graphs.fatturato.type,
      data: {
          labels: moment.months(),
          datasets: [{
            label: 'Vendite',
            data: graphs.fatturato.data,
            backgroundColor: colorBack(),
            borderColor: colorBorder(),
            borderWidth: 1
          }]
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

function fatturatoByAgent(graphsAgent){
  var getLabels = Object.keys(graphsAgent.fatturato_by_agent.data);
  var getData = Object.values(graphsAgent.fatturato_by_agent.data);
  var ctx = document.getElementById('agent').getContext('2d');
  new Chart(ctx, {
      type: "pie",
      data: {
          labels: getLabels,
          datasets: [{
              data: getData,
              backgroundColor: "yellow",
              borderColor: "red"
          }]
      },
  });
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
