let num1 = 0;
let operator;
let finishFlag = false;

document.addEventListener("DOMContentLoaded", (e) => {
  const numpadBtns = document
    .getElementById("numpad")
    .getElementsByClassName("btn");
  for (element of numpadBtns) {
    if (element.id === "bs") element.addEventListener("click", bsHandler);
    else element.addEventListener("click", numpadHandler);
  }
  const controlBtns = document
    .getElementById("control")
    .getElementsByClassName("btn");
  for (element of controlBtns) {
    // if (element.id === "=") element.addEventListener("click", resHandler);
    if (element.id === "clear") element.addEventListener("click", clearHandler);
    else element.addEventListener("click", operatorHandler);
  }
});

const numpadHandler = (e) => {
  const monitor = document.getElementById("monitor-data");
  if (finishFlag) {
    finishFlag = false;
    document.getElementById("history").innerHTML = "";
    operator = null;
  }
  const el = e.currentTarget;
  const num = +(monitor.innerHTML + el.innerHTML);
  monitor.innerHTML =
    el.innerHTML === "." ? monitor.innerHTML + el.innerHTML : num;
};

const bsHandler = (e) => {
  const monitor = document.getElementById("monitor-data");
  if (finishFlag) {
    finishFlag = false;
    document.getElementById("history").innerHTML = "";
    operator = null;
    findResult(+monitor.innerHTML);
  }
  if (monitor.innerHTML === "0") return;
  monitor.innerHTML = monitor.innerHTML.substring(
    0,
    monitor.innerHTML.length - 1
  );
  if (!monitor.innerHTML) monitor.innerHTML = 0;
};

const operatorHandler = (e) => {
  const monitor = document.getElementById("monitor-data");
  const history = document.getElementById("history");
  if (finishFlag) {
    operator = null;
    finishFlag = false;
    history.innerHTML = "";
  }
  const el = e.currentTarget;
  findResult(+monitor.innerHTML);
  operator = el.innerHTML;
  history.innerHTML += `${+monitor.innerHTML} ${operator} `;
  if (operator === "=") {
    finishFlag = true;
    history.innerHTML += num1;
    monitor.innerHTML = num1;
  } else monitor.innerHTML = "0";
};

const findResult = (num) => {
  switch (operator) {
    case "+":
      num1 += num;
      break;
    case "-":
      num1 -= num;
      break;
    case "*":
      num1 *= num;
      break;
    case "/":
      num1 /= num;
      break;
    case "=":
      break;
    default:
      num1 = num;
  }
};

const clearHandler = (e) => {
  num1 = 0;
  operator = null;
  document.getElementById("monitor-data").innerHTML = "0";
  document.getElementById("history").innerHTML = "";
};
