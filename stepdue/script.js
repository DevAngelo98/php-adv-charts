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