var mydata;

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  var lat = crd.latitude;
  var lon = crd.longitude;
  var acc = crd.accuracy;
  mydata = {latitude: lat, longitude:lon, accuracy:acc};
  
  
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);

console.log(mydata);


var lat = mydata.latitude;
var lon = mydata.longitude;




var weatherDate = $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID=24ac12f1c21909e18cf067897c054255', function (response) {
        for (var i = 0; i < response.length; i++) {
            var data = response[i].data;
            if (data.name.length > 3) {
                models.push(data);
            }

        }

     });
var weaObj = weatherDate.responseJSON;
var loc = weaObj.name;
var tempK = weaObj.main.temp;
var tempF = 9/5*(tempK - 273.15) + 32
var tempC = tempK - 273.15
