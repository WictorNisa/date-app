console.log("Hello World");
const timeContainer = document.getElementById("clock-div");
const quoteContainer = document.getElementById('quote-div');
const quoteh6 = document.getElementById('quote-h6');
const quotep = document.getElementById('quote-p');
const locationText = document.getElementById('locationText');
const currentTimezone = document.getElementById('current-timezone-p');
const dayOfYear = document.getElementById('dayofyear-p');
const dayOfWeek = document.getElementById('dayofweek-p');
const currentWeekNumber = document.getElementById('weeknumber-p');
const buttonDiv = document.getElementById('modal-show');
const button = document.getElementById('button');




function loadTime() {
  const greetUserText = document.getElementById('greet-the-user');
  const main = document.getElementById('main');
  const loadPromise = fetch("http://worldtimeapi.org/api/ip");
  loadPromise.then((response) => {
    const convertResponse = response.json();
    convertResponse.then((timezone) => {
        // console.log(timezone);
      let localTime = timezone.datetime;
      const date = new Date(localTime);
      let hours = date.getHours();
      let minutes = date.getMinutes();

      function addZero(component) {
        return component < 10 ? "0" + component : component;
      }
      hours = hours === 0 ? 12 : hours > 24 ? hours - 24 : hours;
      hours = addZero(hours);
      minutes = addZero(minutes);

      let timeString = `${hours}:${minutes}`;
      timeContainer.innerHTML = timeString;

      function checkTime() {
          if(hours <= 12){
            greetUserText.innerText = `Good Morning`;
          } else if (hours <= 18){
            greetUserText.innerText = `Good Afternoon`;
          } else {
            greetUserText.innerText = `Good Evening`;
            main.style.backgroundImage = "url('../img/night-hero.jpg')";
          }
    }
    checkTime();
      let currentDayOfYear = `${timezone.day_of_year}`;
      dayOfYear.innerText = currentDayOfYear;
      let currentDayOfWeek = `${timezone.day_of_week}`;
      dayOfWeek.innerText = currentDayOfWeek;
      let currentWeek = `${timezone.week_number}`;
      currentWeekNumber.innerText = currentWeek;
      let timer = setTimeout(loadTime, 1000);
    });
  });
}

loadTime();


function loadQuote() {
    const loadPromise = fetch('https://stoic-server.herokuapp.com/random');
    loadPromise.then(response => {
        const convertResponse = response.json();
        convertResponse.then((quote) => {
            const baseQuote = quote[0];
            let quoteBody = `${baseQuote.body}`;
            let quoteAuthor = `${baseQuote.author}`;
            quoteh6.innerText = quoteBody;
            quotep.innerText = quoteAuthor;
        })
    })
}

loadQuote();


function loadLocation() {
    const loadPromise = fetch('https://freegeoip.app/json/');
    loadPromise.then(response => {
        const convertResponse = response.json();
        convertResponse.then((location) =>{
            let locationBody = `IN ${location.country_name}, ${location.country_code}`;
            locationText.innerText = locationBody;
            let currentTimeText = `${location.time_zone}`;
            currentTimezone.innerText = currentTimeText;
        });
    });
}
loadLocation();


button.addEventListener("click", () => {
  const moreLessText = document.getElementById('more-less-p');
  const modal = document.getElementById('modal-flip');
    if(modal.style.display === 'none'){
      modal.style.display = 'flex';
      moreLessText.innerText = 'More';
    } else{
      modal.style.display = 'none';
      moreLessText.innerText = 'More';

    }
});


function loadWeather() {
  const weatherP = document.getElementById('weather-p');
  const loadPromise = fetch('http://api.weatherapi.com/v1/current.json?key=735b3b6062174bf08f8155048212602&q=Lund');
  loadPromise.then(response => {
    const convertResponse = response.json();
    convertResponse.then((weather) =>{
        console.log(weather.current);
        let weatherbody = `Currently ${weather.current.temp_c}c`;
        weatherP.innerText = weatherbody;
        

    });
});
}
loadWeather();


