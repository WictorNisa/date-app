console.log("Hello World");
const timeContainer = document.getElementById("clock-div");

function loadTime() {
  const loadPromise = fetch("http://worldtimeapi.org/api/ip");
  loadPromise.then((response) => {
    const convertResponse = response.json();
    convertResponse.then((timezone) => {
      let localTime = timezone.datetime;
      const date = new Date(localTime);
      console.log(date);
      let hours = date.getHours();
      let minutes = date.getMinutes();

      function addZero(component) {
        return component < 10 ? "0" + component : component;
      }
      hours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      hours = addZero(hours);
      minutes = addZero(minutes);


      let timeString = `${hours} : ${minutes}`;
      timeContainer.innerHTML = timeString;
      let timer = setTimeout(loadTime, 1000);
    });
  });
}

loadTime();
