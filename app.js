class Time {
  constructor(year, hours, minutes, seconds) {
    this.year = year;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  getYear() {
    return new Date().getFullYear();
  }
  getHours() {
    return new Date().getHours();
  }
  getMinutes() {
    return new Date().getMinutes();
  }
  getSeconds() {
    return new Date().getSeconds();
  }
}

class Clock extends Time {
  constructor(year, hours, minutes, seconds) {
    super(year, hours, minutes, seconds);
  }
}

const now = new Clock();

const cities = ["istanbul", "tokyo", "paris", "moskova"];

const cityAdd = document.querySelector(".container");

const a = cities.forEach((x, i) => {
  cityAdd.innerHTML += `
    <div class="city ${x}">
    <div class="digital">

    <div class="hours text ${x}"></div>


    <div class="minutes text "></div>


    <div class="seconds text "></div>

  </div>
  <div class="analog">
    <div class="hourbar ${x}"></div>
    <div class="minutebar"></div>
    <div class="secondbar"></div>
  </div>
  <div>
  <h3>${x}</h3>
  <h4 class="temp ${x}"></h4>
  </div>
  </div>`;
});

let h, m, s, t, p, mk;
let hours, minutes, seconds, digital;
let hourbar, minutebar, secondbar;
hourbar = document.querySelectorAll(".hourbar");
minutebar = document.querySelectorAll(".minutebar");
secondbar = document.querySelectorAll(".secondbar");
hours = document.querySelectorAll(".hours");
minutes = document.querySelectorAll(".minutes");
seconds = document.querySelectorAll(".seconds");

setInterval(() => {
  h = now.getHours();
  m = now.getMinutes();
  s = now.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  //digital clock

  Array.from(hours).forEach((x) => {
    if (x.classList.contains("istanbul")) {
      x.innerText = h;
    } else if (x.classList.contains("tokyo")) {
      t = (Number(h) + 6) % 24;
      t = t < 10 ? "0" + t : t;
      x.innerText = t;
    } else if (x.classList.contains("paris")) {
      p = (Number(h) - 1) % 24;
      p = p < 10 ? "0" + p : p;
      x.innerText = p;
    } else if (x.classList.contains("moskova")) {
      x.innerText = h;
    }
  });
  Array.from(minutes).forEach((x) => {
    x.innerText = m;
  });
  Array.from(seconds).forEach((x) => {
    x.innerText = s;
  });

  //analog

  Array.from(secondbar).forEach((x) => {
    x.style.transform = `rotate(${270 + s * 6}deg)`;
  });
  Array.from(minutebar).forEach((x) => {
    x.style.transform = `rotate(${270 + m * 6}deg)`;
  });
  Array.from(hourbar).forEach((x) => {
    if (x.classList.contains("istanbul")) {
      h = now.getHours();
      x.style.transform = `rotate(${270 + h * 30}deg)`;
    } else if (x.classList.contains("tokyo")) {
      h = now.getHours() + 6;
      x.style.transform = `rotate(${270 + h * 30}deg)`;
    } else if (x.classList.contains("paris")) {
      h = Number(now.getHours()) - 1;
      x.style.transform = `rotate(${270 + h * 30}deg)`;
    } else if (x.classList.contains("moskova")) {
      h = now.getHours();
      x.style.transform = `rotate(${270 + h * 30}deg)`;
    }
  });
}, 1000);
let arr = [];
const getData = () => {
  const cityWeather = cities.forEach((x) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${x}&appid=c460d0183897f275d6ea98399e221867&units=metric&lang=tr`;

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        weather(data);
      });
    const weather = (data) => {
      const temp1 = document.querySelectorAll(".temp");
      arr.push(data);
      console.log(arr);
      const { name } = data;
      const istanbultemp = arr.find(({ name }) => name == "İstanbul");
      const tokyotemp = arr.find(({ name }) => name == "Tokyo");
      const paristemp = arr.find(({ name }) => name == "Paris");
      const moskovatemp = arr.find(({ name }) => name == "Moskova");

      Array.from(temp1).forEach((x) => {
        if (x.classList.contains("istanbul")) {
          x.innerText = `${Math.trunc(istanbultemp.main.temp)}°C`;
        } else if (x.classList.contains("tokyo")) {
          x.innerText = `${Math.trunc(tokyotemp.main.temp)}°C`;
        } else if (x.classList.contains("paris")) {
          x.innerText = `${Math.trunc(paristemp.main.temp)}°C`;
        } else if (x.classList.contains("moskova")) {
          x.innerText = `${Math.trunc(moskovatemp.main.temp)}°C`;
        }
      });
    };
  });
};
getData();
