const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");
let formatTimer = "num";
if (formatTimer === "num") {
  const span = document.querySelector('[data-id="1"]');
  span.classList.add("changed");
}
// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    let elem = document.getElementById("greenLoad");
    let n = 100 / seconds;
    let width = 0;
    let interval = setInterval(() => {
      if (width >= 100) {
        clearInterval(interval);
      } else {
        width = n + width;
      }
      elem.style.width = width + "%";
      elem.innerHTML = Number.isInteger(width * 1)
        ? width * 1 + "%"
        : (width * 1).toFixed(3) + "%";
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  buttonEl.removeAttribute("disabled");
  for (let i = 0; i < inputEl.value.length; i++) {
    isNaN(inputEl.value[i]) || inputEl.value[i] === " "
      ? (inputEl.value = inputEl.value.replace(inputEl.value[i], ""))
      : inputEl.value;
  }
});

buttonEl.addEventListener("click", () => {
  buttonEl.setAttribute("disabled", "disabled");
  const progressBar = document.createElement("div");
  const greenLoad = document.createElement("div");
  greenLoad.setAttribute("id", "greenLoad");
  progressBar.setAttribute("id", "greyProgress");
  progressBar.append(greenLoad);
  const timerContainer = document.createElement("div");
  timerContainer.classList.add("timerContainer");
  const seconds = Number(inputEl.value);

  timerContainer.classList.add("timerContainer");
  const timerTitle = document.createElement("h2");

  timerContainer.append(timerTitle);
  timerContainer.append(progressBar);
  document.querySelector(".format__container").after(timerContainer);

  let hours = Math.floor(Number(inputEl.value) / 3600);
  let minutes = Math.floor((seconds - hours * 3600) / 60);
  let sec = Number(inputEl.value) - (hours * 3600 + minutes * 60);
  console.log(formatTimer);
  animateTimer(seconds);
  console.log(formatTimer);
  timerTitle.textContent =
    formatTimer === "num"
      ? formatNum(hours, minutes, sec)
      : formatString(hours, minutes, sec);
  setInterval(() => {
    if (sec > 0) {
      sec = sec - 1;
      timerTitle.textContent =
        formatTimer === "num"
          ? formatNum(hours, minutes, sec)
          : formatString(hours, minutes, sec);

      if (sec === 0 && minutes > 0) {
        sec = 60;
        minutes = minutes - 1;
        sec = sec - 1;
        timerTitle.textContent =
          formatTimer === "num"
            ? formatNum(hours, minutes, sec)
            : formatString(hours, minutes, sec);
      }
    } else if (sec === 0 && minutes > 0) {
      sec = 60;
      minutes = minutes - 1;
      sec = sec - 1;
      timerTitle.textContent =
        formatTimer === "num"
          ? formatNum(hours, minutes, sec)
          : formatString(hours, minutes, sec);
    } else if (sec === 0 && minutes === 0 && hours > 0) {
      sec = 60;
      minutes = 59;
      sec = sec - 1;
      hours = hours - 1;
      timerTitle.textContent =
        formatTimer === "num"
          ? formatNum(hours, minutes, sec)
          : formatString(hours, minutes, sec);
    } else if (sec === 0 && minutes === 0 && hours === 0) {
      timerTitle.textContent = `СТОП`;
    }
  }, 1000);

  inputEl.value = "";

  inputEl.addEventListener("input", () => {
    timerContainer.remove();
  });
});

const format = document.querySelector(".format__container");
format.addEventListener("click", (event) => {
  if (event.target.dataset.id === "1") {
    const span = document.querySelector('[data-id="1"]');
    span.classList.add("changed");
    formatTimer = "num";

    const spanTwo = document.querySelector('[data-id="2"]');
    spanTwo.classList.remove("changed");
  } else {
    formatTimer = "string";
    const span = document.querySelector('[data-id="2"]');
    span.classList.add("changed");

    const spanTwo = document.querySelector('[data-id="1"]');
    spanTwo.classList.remove("changed");
  }
});

function formatNum(hours, minutes, sec) {
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${sec < 10 ? "0" + sec : sec}`;
}

function formatString(hours, minutes, sec) {
  console.log(hours, minutes, sec);
  return ` ${convertNumberToWords(hours)} ${changeEnding(
    hours,
    "час"
  )} ${minutes} ${changeEnding(minutes, "минут")} ${sec}  ${changeEnding(
    sec,
    "секунд"
  )}`;
}

function changeEnding(number, data) {
  unit = data === "секунд" ? "секунд" : data === "минут" ? "минут" : "час";
  console.log(data);
  if (number) {
    return ["2", "3", "4"].some((item) => {
      return item === number.toString().slice(number.toString().length - 1);
    }) &&
      !["12", "13", "14"].some((item) => {
        return (
          item ===
          number
            .toString()
            .slice(number.toString().length - 2, number.toString().length)
        );
      })
      ? unit === "час"
        ? ` ${unit}а`
        : `${unit}ы`
      : ["1"].some((item) => {
          return item === number.toString().slice(number.toString().length - 1);
        }) &&
        !["11"].some((item) => {
          return (
            item ===
            number
              .toString()
              .slice(number.toString().length - 2, number.toString().length)
          );
        })
      ? unit === "час"
        ? ` ${unit}`
        : `${unit}a`
      : unit === "час"
      ? ` ${unit}ов`
      : `${unit}`;
  } else return unit === "час" ? ` ${unit}ов` : `${unit}`;
}

function convertNumberToWords(data) {
  dischargeOne = [
    "ноль",
    "один",
    "два",
    "три",
    "четыри",
    "пять",
    "шесть",
    "семь",
    "восемь",
    "девять",
  ];
  dischargeTwo = [
    "десять",
    "одинадцать",
    "двенадцать",
    "тринадцать",
    "четырнадцать",
    "пятнадцать",
    "шеснадцать",
    "семнадцать",
    "восемнадцать",
    "девятнадцать",
  ];

  if (data.toString().length === 1) {
    for (let i = 0; i < data + 1; i++) {
      if (data === i) {
        return dischargeOne[i];
      }
    }
  } else if (
    data.toString().length === 2 &&
    (Number(data.toString()[0]) >= 1 || Number(data.toString()[0]) < 2)
  ) {
    for (let i = 10; i < 20; i++) {
      if (data === i) {
        return dischargeTwo[Number(i.toString()[1])];
      }
    }
  }
  return data;
}
