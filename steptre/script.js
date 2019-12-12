$(document).ready(init);

function init(){
  getData();
}

function getData(){
  $.ajax({
    url: "getAllData.php",
    method: "GET",
    success: function(data){
      fatturato(data);
      fatturatoByAgent(data);
      efficienza(data);
    },
    error: function(err){
      console.log("error: ", err);
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

function fatturato(graphs){
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
  console.log(graphsAgent);
  
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
  // console.log(dataTeam.team_efficiency);
  // var getLabels = dataTeam.team_efficiency.data;
  // get(getLabels);
  // var getData1 = Object.values(dataTeam.team_efficiency.data.Team1);
  // var getData2 = Object.values(dataTeam.team_efficiency.data.Team2);
  // var getData3 = Object.values(dataTeam.team_efficiency.data.Team3);
  // console.log(getLabels);
  
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
