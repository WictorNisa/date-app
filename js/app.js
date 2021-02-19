console.log("Hello World");
const timeContainer = document.getElementById("clock-div");
const quoteContainer = document.getElementById('quote-div');
const quoteh6 = document.getElementById('quote-h6');
const quotep = document.getElementById('quote-p');
const locationText = document.getElementById('locationText');

function loadTime() {
  const loadPromise = fetch("http://worldtimeapi.org/api/ip");
  loadPromise.then((response) => {
    const convertResponse = response.json();
    convertResponse.then((timezone) => {
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


      let timeString = `${hours} : ${minutes}`;
      timeContainer.innerHTML = timeString;
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
            let locationBody = `${location.country_name}, ${location.country_code}`;
            locationText.innerText = locationBody;
        });
    });
}
loadLocation();
