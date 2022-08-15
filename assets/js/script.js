var searchInputVal = document.querySelector('#searchInput');
var prevSearchEl = document.querySelector('#prevSearch');
var searchFormEl = $('#searchForm');
var fiveDayEl = document.querySelector('#fiveDay');
var currentEl = $('#current');

var lat;
var lon;
var city;

// initialize
function init(){
    renderLocStor();

}





function getCoordinates(){
city = searchInputVal.value.trim();


//getting coordinates from city
var apiURL =  "https://api.openweathermap.org/data/2.5/weather?q=" + city + ",USA&APPID=deea8678f358f6e59a970dd133b9edc3";

fetch(apiURL)
        .then(function(response){
            if (!response.ok) {
                throw response.json();
              }
        
              return response.json();
        })
        .then(function(data){
            console.log(data);
            
            lat = data.coord.lat;
            lon = data.coord.lon;

            searchAPI(lat,lon);

        })


}


// Functions to get cordinates

function getLat(){
    return lat;
}

function getLon(){
    return lon;
}



// gathering data form api
function searchAPI(lat,lon){
    // API information
    var APIurl = 'https://api.openweathermap.org/data/2.5/onecall?';
    var APIKey = 'deea8678f358f6e59a970dd133b9edc3';
    var locAPIKey = 'appid=' + APIKey;
    var locLat = 'lat=' + getLat();
    var locLon = 'lon=' + getLon();

    APIurl = APIurl + '&' + locLat + '&' + locLon + '&' + locAPIKey;

    fetch(APIurl)
        .then(function(response){
            if (!response.ok) {
                throw response.json();
              }
        
              return response.json();
        })
        .then(function(data){
            printCurrent(data);
            printFiveDay(data);

        })
}

// print current weather data to applciation
function printCurrent(resultObj){
    console.log(resultObj);
    currentEl.parent().removeClass("d-none");
    var curCityEl = $('#city');
    var curDateEl = $('#date');
    var curIconEl = $('#icon');
    var curTempEl = $('#temp');
    var curWindEl = $('#wind');
    var curHumidEl = $('#humid');
    var curUvEl = $('#uv');

    // add city info 
    curCityEl.text(city + " ");
    
    // add date info
    var today = moment().utcOffset((resultObj.timezone_offset/60)).format('[(]M[/]DD[/]YYYY[)]');
    curDateEl.text(today);

    //current icon
    var icon = resultObj.current.weather[0].icon;
    curIconEl.attr('src', 'http://openweathermap.org/img/wn/' + icon + '@2x.png');

    //current temp displayed
    var curTemp = resultObj.current.temp;
    curTemp = getFahrenheit(curTemp).toFixed();
    curTempEl.text("Temp: " + curTemp + '°F' )

    //render current wind with direction
    var curWind = resultObj.current.wind_speed;
    var windDir = windDirection(resultObj.current.wind_deg);
    curWindEl.text("Wind: " + curWind + " mph from " + windDir);

    // Render humidty

    curHumidEl.text('Humidity: ' + resultObj.current.humidity + " %")
    
    
    //render current uv (our instructor told us skip this part talk with Stephen Oveson)

    // var curUV = resultObj.current.uvi;
    // curUvEl = text(curUV);
}

function printFiveDay(resultObj){

    fiveDayEl.innerHTML = "";

    for(var i = 0; i < 5; i++){
    // create the card
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-dark', 'text-light', 'm-2', 'p-2');
    resultCard.setAttribute('style','width: 10rem;')
    

    //create header of card
    var cardHeaderEl = document.createElement('div');
    cardHeaderEl.classList.add('card-header');
    cardDate = moment().utcOffset((resultObj.timezone_offset/60)).add(i,'days').format('[(]M[/]DD[/]YYYY[)]');
    cardHeaderEl.textContent = cardDate;
  
    //render weather icon
    var imgItemEl = document.createElement('img');
    imgItemEl.setAttribute('src','http://openweathermap.org/img/wn/' + resultObj.daily[i].weather[0].icon + '@2x.png')
    
    
    // add unorder list element
    var listEl = document.createElement('ul');
    listEl.classList.add('list-group','list-group-flush');
    
    // Temp forecast
    var tempEl = document.createElement('li');
    tempEl.textContent = 'Temp: ' + getFahrenheit(resultObj.daily[i].temp.max).toFixed() + ' °F';

    // render wind
    var windEl = document.createElement('li');
    windEl.textContent = 'Wind: ' + resultObj.daily[i].wind_speed + ' mph';

    // render humidity
    var humidEl = document.createElement('li');
    humidEl.textContent = 'Humidity: ' + resultObj.daily[i].humidity + '%';

    


    listEl.append(imgItemEl,tempEl,windEl,humidEl);
    resultCard.append(cardHeaderEl,listEl);
    fiveDayEl.append(resultCard);
    
    
    }
}


// converting kelvins to Fahrenheit
function getFahrenheit(kelvin){
    var fahr = (kelvin - 273.15) * (9/5) + 32;
    return fahr;
}

//Find wind Direction(math is off but can fix later 45 degrees for every option)
function windDirection(degrees){
    if (degrees < 23 || degrees > 337){
        return "N";
    }else if (degrees > 22 && degrees < 67){
        return "NE";
    }else if (degrees > 66 && degrees < 111){
        return "E"
    }else if (degrees > 110 && degrees < 155){
        return "SE"
    }else if (degrees > 154 && degrees < 199){
        return "S";
    }else if (degrees > 198 && degrees < 243){
        return "SW";
    }else if (degrees > 242 && degrees < 288){
        return "W";
    }else{
        return "NW";
    }
}

function renderLocStor(){
    return;
}


// on submit look up weather data based on query information
function handleSearchSubmit(event){
    event.preventDefault();

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    getCoordinates();
}

searchFormEl.on('submit',handleSearchSubmit);
