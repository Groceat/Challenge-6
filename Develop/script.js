
var sbtn = document.getElementById("sbtn");
var sinput = document.getElementById("sinput");
var sform = document.getElementById("sform");
var slist = document.getElementById("searchlist");
var cardslist = document.getElementById("cardslist");
var citytit =  document.getElementById("citytitle");
var cstats=  document.getElementById("editor");
var curhour = moment().format("DD MM YYYY");
if(JSON.parse(localStorage.getItem("cities"))){
var oldreqs = JSON.parse(localStorage.getItem("cities"))}
else{oldreqs=[]}

if(JSON.parse(localStorage.getItem("temp"))){
  var reqcity = JSON.parse(localStorage.getItem("temp"))}
  else{var reqcity = oldreqs[oldreqs.length-1]}
var apifirst= "https://api.openweathermap.org/data/2.5/weather?q=" + reqcity + "&appid=0974315e893a32aaf000d6dde50948f4";
var apishell= "https://api.openweathermap.org/data/2.5/forecast?q=" + reqcity + "&appid=0974315e893a32aaf000d6dde50948f4";
cardslist.style="display: inline-grid"

fetch(apifirst)
  .then(function (response) {
    return response.json();
  })
  .then(function (first) {
console.log(first);
var temps = document.createElement("p");
var winds = document.createElement("p");
var humin = document.createElement("p");
var hdate = document.createElement("p");
temps.textContent="Tempurature: " + first.main.temp +"F";
winds.textContent="Wind Speed: " + first.wind.speed+" mph";
humin.textContent="Humidity: " +first.main.humidity;
hdate.textContent="date: " + curhour;
cstats.appendChild(temps)
cstats.appendChild(winds)
cstats.appendChild(humin)
cstats.appendChild(hdate)
  });
fetch(apishell)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    for(var i =0; i<data.list.length; i+=8) {

      var cardc = document.createElement("div");
      var contc = document.createElement("div");
      var temps = document.createElement("p");
      var winds = document.createElement("p");
      var humin = document.createElement("p");
      var hdate = document.createElement("p");

      contc.className="card-body";
      cardc.className="card";
      cardc.style="width: 18rem"
     temps.textContent="Tempurature: " + data.list[i].main.temp +"F";
     console.log(temps.textContent);
     winds.textContent="Wind Speed: " + data.list[i].wind.speed+" mph";
     humin.textContent="Humidity: " +data.list[i].main.humidity;
     hdate.textContent="date: " + data.list[i].dt_txt;
contc.appendChild(temps);
contc.appendChild(winds);
contc.appendChild(humin);
contc.appendChild(hdate);
cardc.appendChild(contc);
cardslist.appendChild(cardc);}

     
    
    citytit.textContent=data.city.name;
  });
  if(JSON.parse(localStorage.getItem("temp"))){
    localStorage.clear("temp")
    }
  for(var i =0; i<oldreqs.length; i++){
    var reccthing = document.createElement("li");
    reccthing.textContent= oldreqs[i];
    slist.appendChild(reccthing);
    
    }
    slist.addEventListener("click",function(event){
      localStorage.setItem("temp",JSON.stringify(event.target.textContent));
      location.reload()
          })

sform.addEventListener("submit", function(event){
    oldreqs.push(sinput.value)
    localStorage.setItem("cities",JSON.stringify(oldreqs));
    
})





