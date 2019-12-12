$(document).ready(init);

function init(){
  chart();
  getData();
}

function getData(){
  $.ajax({
    url: "getAllData.php",
    method: "GET",
    success: function(data){
      chart(data);
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

function chart(data){
  var ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
      type: 'line',
      data: {
          labels: moment.months(),
          datasets: [{
              label: 'Vendite',
              data: data,
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
