$(document).ready(function(){  

var lat;
var lon;
var tempC;
var tempF;

function weather(){
//options parameter for navigator
var options = {
  enableHighAccuracy: true,
  //timeout: 5000,
  maximumAge: 0
};
//Function for the navigator parameter success
function success(pos) {
  var crd = pos.coords;
  lat = crd.latitude;
  lon = crd.longitude;
  var acc = crd.accuracy;
  
  console.log("La latitud es: "+lat);
  console.log("La longitud es: "+lon);
  
  //Request to the api of openweathermap to get the actual state of the weather
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&APPID=24ac12f1c21909e18cf067897c054255&units=metric', function (response) {
        for (var i = 0; i < response.length; i++) {
            var data = response[i].data;
            if (data.name.length > 3) {
                models.push(data);
            }

        }
		//temperature in Celcius
		tempC = response.main.temp;
		//temperature in Fahrenheit
		tempF = tempC * 9/5 + 32;
		//Variable to determine the landscape background of the page.
    var climateDescription = response.weather[0].description;
    var landscape = response.weather[0].description.split(' ').join('-');
    var climateResume = response.weather[0].main;
		var date = new Date(response.dt * 1000).getHours();
    var dateMinutes = new Date(response.dt * 1000).getMinutes();
    var dateComplete = date+':'+dateMinutes;
    var yourLocation = response.name;

    if (date < 18 && date >6){

      var timeLight = 'day'
    }
    else{var timeLight = 'night'}
		console.log("The time is: "+date);
	
		console.log("La temperatura en Celcius es: " + tempC);
		console.log("La temperatura en Fahrenheit es: "	+ tempF);
		$('.climate').text(tempC+' °C');
    $('.yourTime').text(dateComplete);
    $('.climResume').text(climateResume);
    $('.climDescription').text(climateDescription);
    $('.yourLocation').text(yourLocation);
    $('body').addClass(landscape+'-'+timeLight);
    $('#icon').prepend('<img src="http://theviajerock.tk/img/'+landscape+'-'+timeLight+'-icon.png">');
                        
    console.log('<img src="http://theviajerock.tk/img/'+landscape+'-'+timeLight+'-icon.png"')
    
     });



}
//Function error for the navigator parameter error 
function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};


//navigator
navigator.geolocation.getCurrentPosition(success, error, options);

}

weather();

$('#buttonChange').click(function(){

    if ($('#buttonChange').text() == "°C" ){
      
        $('.climate').text(tempF + ' °F');
        $('#buttonChange').text('°F');
    }      
      else if ($('#buttonChange').text() == '°F' ) {
      $('.climate').text(tempC + ' °C');
      $('#buttonChange').text('°C');

    }

  }
    



  

  );

});