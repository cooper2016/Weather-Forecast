var searchInputVal = document.querySelector('#searchInput');
var prevSearchEl = document.querySelector('#prevSearch');
var searchFormEl = $('#searchForm');
var fiveDayEl = document.querySelector('#fiveDay');
var currentEl = document.querySelector('#current');

var lat = 44.943611;
var lon = -93.368294;


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


        })
}

// print current weather data to applciation
function printCurrent(resultObj){
    console.log(resultObj);
    
    

}


// converting kelvins to Fahrenheit
function getFahrenheit(kelvin){
    var fahr = (kelvin - 273.15) * (9/5) + 32;
    console.log(fahr);
    return fahr;
}



// on submit look up weather data based on query information
function handleSearchSubmit(event){
    event.preventDefault();

    if (!searchInputVal) {
        console.error('You need a search input value!');
        return;
    }

    searchAPI();
}

searchFormEl.on('submit',handleSearchSubmit);
