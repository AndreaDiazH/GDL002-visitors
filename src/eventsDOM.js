// this part open the webcam, take a picture and save it in "visitorPicture"

let visitorPicture = null;

(function() { 
  
let streaming = false,
    video        = document.querySelector('#video'),
    canvas       = document.querySelector('#canvas'),
    photo        = document.querySelector('#photo'),
    startbutton  = document.querySelector('#startbutton'),
    width = 300,
    height = 300;
 
 navigator.getMedia = ( navigator.getUserMedia ||
 navigator.webkitGetUserMedia ||
 navigator.mozGetUserMedia ||
 navigator.msGetUserMedia);
 
 navigator.getMedia(
   {
     video: true,
     audio: false
   },
   function(stream) {
     if (navigator.mozGetUserMedia) {
       video.mozSrcObject = stream;
     } else {
       let vendorURL = window.URL || window.webkitURL;
       video.srcObject=stream;
     }
     video.play();
   },
   function(err) {
     console.log("An error occured! " + err);
   }
 );
 
 video.addEventListener('canplay', function(ev){
   if (!streaming) {
     height = video.videoHeight / (video.videoWidth/width);
     video.setAttribute('width', width);
     video.setAttribute('height', height);
     canvas.setAttribute('width', width);
     canvas.setAttribute('height', height);
     streaming = true;
   }
 }, false);
 
 function takepicture() {
   canvas.width = width;
   canvas.height = height;
   canvas.getContext('2d').drawImage(video, 0, 0, width, height);
   visitorPicture = canvas.toDataURL('image/png');
   photo.setAttribute('src', data);
 }

 startbutton.addEventListener('click', function(ev){
   takepicture();
   ev.preventDefault();
 }, false);
 
})();



let tableData = document.getElementById('table-data');

//this function create cards with the info of visitors collection and show it to the admin.
function guestList() {
  db.collection("visitors").orderBy("hour","desc").onSnapshot(querySnapshot => {
    tableData.innerHTML = '';
    querySnapshot.forEach(doc => {
      let formatHour = new Date (doc.data().hour.seconds*1000);
      tableData.innerHTML += `
      <div class="card col-md-3">
      <h5 class="card-header"><img src="../img/favicon2.ico"></h5>
      <div class="card-body">
      <p class="card-text">Nombre: <br> ${doc.data().name}</p>
      <p class="card-text">CoWorker:<br> ${doc.data().visiting}</p>
      <p class="card-text">Hora de entrada: <br> ${formatHour}</p>
      <p class="card-text">Foto:<br> <img src= "${doc.data().photo}" class= "formatVideo"></p>
      </div>
      </div>   `;
    });
  });
  drawChart();
  drawChart2();
}

function drawChart() {
  
  // Create the data table for Sarah's pizza.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Día');
  data.addColumn('number', 'Cantidad de visitantes');
  data.addRows([
  ['Lunes', 10],
  ['Martes', 8],
  ['Miercoles', 3],
  ['Jueves', 15],
  ['Viernes', 9]
  ]);
  // Set options for Sarah's pie chart.
  var options = {title:'Visitantes por día',
    width:400,
    height:300};
    
    // Instantiate and draw the chart for Sarah's pizza.
    var chart = new google.visualization.BarChart(document.getElementById('charts'));
    chart.draw(data, options);
}

function drawChart2() {
  
  // Create the data table for Anthony's pizza.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'visitantes');
  data.addColumn('number', 'CoWorker');
  data.addRows([
  ['Laboratoria', 50],
  ['ReportNow', 35],
  ['CarphathiaLab', 20],
  ['GeeKGirls', 15],
  ]);
  
  // Set options for Anthony's pie chart.
  var options = {title:'CoWorkers más visitados',
    width:400,
    height:300};
    
    // Instantiate and draw the chart for Anthony's pizza.
    var chart = new google.visualization.PieChart(document.getElementById('charts2'));
    chart.draw(data, options);
}


let selectCoworker = document.getElementById('selectCoworker');

//this function create fields on the select with the name of the coworker
function dinamicSelector () {
  db.collection("coworkers").onSnapshot(querySnapshot =>{
    selectCoworker.innerHTML = '<option value="">A quien visitas</option>';
    querySnapshot.forEach(doc => {
      selectCoworker.innerHTML +=`
      <option value="${doc.data().email}">${doc.data().name}</option>`;
    });
  });
}


