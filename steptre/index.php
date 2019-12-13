
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <!-- JS: CHART-JS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.js"></script>
  <!-- JS: MOMENT -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js"></script>
  <!-- JS: JQUERY -->
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <!-- JS: MY SCRIPT -->
  <script src="script.js" charset="utf-8"></script>
  <link rel="stylesheet" href="style.css">
  <title>Document</title>
</head>
<body>
  
  <div class="container" data-param=<?=$_GET["level"]?>>
    <div class="wrap">
      <h1>Step 1</h1>
      <canvas id="myChart"></canvas> 
    </div>
    <div class="wrap">
      <h1>Step 2</h1>
      <canvas id="agent"></canvas> 
    </div>
    <div class="wrap">
      <h1>Step 3</h1>
      <canvas id="clevel"></canvas> 
    </div>
  </div>

</body>
</html>