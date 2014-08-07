function startTime() {
	var today=new Date();
	var h=today.getHours();
	var m=today.getMinutes();
	var s=today.getSeconds();

	m=checkTime(m);
	s=checkTime(s);
	document.getElementById('clock').innerHTML=h+":"+m+":"+s;
	t=setTimeout(function(){startTime()},500);
};

function checkTime(i){
	if (i<10){
		i="0" + i;
	}
	return i;
};

var datas;

function getWeather(){
	var url = "http://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&units=metric&callback=test";
	
	$.ajax({
		url:url,
		type: 'GET',
		dataType: "jsonp",
		contentType: "application/json ",
		success: function(data){
		    datas = data;
	        setWeather(data.main.temp, data.main.humidity, data.main.pressure, data.wind.speed, data.clouds.all,
	        data.name, data.weather[0].icon);
   		    openDB();
		},
		error: function(){
		    alert("Ошибка при получении погоды! Возможно отсутствует интернет соединение.")
		    var db = window.openDatabase("weather", "1.0", "Weather", 1000000);
             db.transaction(queryDB, errorCB);
		}
	}); 
};

function openDB(){
    var db = window.openDatabase("weather", "1.0", "Weather", 1000000);
    db.transaction(populateDB, errorCB, successCB);
};

function populateDB(tx) {
    console.log("populateDB")
    tx.executeSql('CREATE TABLE IF NOT EXISTS WEATHER (id unique, temp, humidity, pressure, windspeed, cloudsall, cityname, icon)');
    tx.executeSql('INSERT OR REPLACE INTO WEATHER (id, temp, humidity, pressure, windspeed, cloudsall, cityname, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [1, datas.main.temp, datas.main.humidity, datas.main.pressure, datas.wind.speed, datas.clouds.all, datas.name, datas.weather[0].icon]);
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {
/**    alert("success!");**/
}

function queryDB(tx) {
        console.log("queryDB(tx)");
        tx.executeSql('SELECT * FROM WEATHER', [], querySuccess, queryError);
    }

function queryError(err) {
    console.log("queryError");
    alert("There is no entity about weather: "+err.code);
}

function querySuccess(tx, results) {
    var len = results.rows.length;
        console.log("WEATHER table: " + len + " rows found.");
        for (var i=0; i<len; i++){
            console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).temp+
            "  " + results.rows.item(i).humidity + "  " + results.rows.item(i).pressure + "  " + results.rows.item(i).windspeed +
            "  " + results.rows.item(i).cloudsall + "  " + results.rows.item(i).cityname + "  " + results.rows.item(i).icon);
    }
    setWeather(results.rows.item(0).temp, results.rows.item(0).humidity, results.rows.item(0).pressure,
    results.rows.item(0).windspeed, results.rows.item(0).cloudsall, results.rows.item(0).cityname, results.rows.item(0).icon);
}

function setWeather(temp, humidity, pressure, windspeed, cloudsall, cityname, icon){
	var path = "weather-icons/";

	document.getElementById('temp').innerHTML = temp + " C&deg;";
	document.getElementById('humidity').innerHTML = humidity + "%";
	document.getElementById('pressure').innerHTML = pressure + " hPa";
	document.getElementById('wind_speed').innerHTML = windspeed + " м/с";
	document.getElementById('clouds').innerHTML = cloudsall + " %";
	document.getElementById('city_name').innerHTML = cityname;

	var icon_id = icon;

	switch(icon_id){
		case("11d"):
		icon = "storm";
		break;
		case("09d"):
		icon = "heavy"
		break;
		case("10d"):
		icon = "heavy"
		break;
		case("13d"):
		icon = "snow"
		break;
		case("50d"):
		icon = "fog"
		break;
		case("01d"):
		icon = "sunny"
		break;
		case("03d"):
		icon = "overcast"
		break;
		case("04d"):
		icon = "overcast"
		break;
		//for night weather
		case("11n"):
		icon = "storm";
		break;
		case("09n"):
		icon = "heavy"
		break;
		case("10n"):
		icon = "heavy"
		break;
		case("13n"):
		icon = "snow"
		break;
		case("50n"):
		icon = "fog"
		break;
		case("01n"):
		icon = "sunny"
		break;
		case("03n"):
		icon = "overcast"
		break;
		case("04n"):
		icon = "overcast"
		break;
	}

	$('#weather-icon').css({"background": "url("+path+icon+".png) no-repeat center"});
};
