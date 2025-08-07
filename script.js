const result = document.getElementById("result");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const lapButton = document.getElementById("lap-button");
const lapList = document.getElementById("lap-list");

let interval;
let running = false;
let startTime = 0;
let lapStartTime = 0;
let laps = [];

const pad = (num) => num.toString().padStart(2, "0");
const padMilli = (num) => num.toString().padStart(3, "0");

startButton.addEventListener("click", () => {
  if (startTime === 0) startTime = Date.now();
  
  if (!running) {
    running = true;
    lapStartTime = Date.now();  // Initialize lap start time
    interval = setInterval(() => {
      let timeGap = Date.now() - startTime;

      let MSS = timeGap % 1000;
      let SS = Math.floor(timeGap / 1000);
      let MM = Math.floor(timeGap / 1000 / 60);

      if (SS >= 60) SS %= 60;

      result.textContent = `${pad(MM)}:${pad(SS)}:${padMilli(MSS)}`;
    }, 15);
  }
});

stopButton.addEventListener("click", () => {
  running = false;
  clearInterval(interval);
});

resetButton.addEventListener("click", () => {
  running = false;
  clearInterval(interval);
  startTime = 0;
  lapStartTime = 0;
  laps = [];
  lapList.innerHTML = '';
  result.textContent = "00:00:000";
});

lapButton.addEventListener("click", () => {
  if (running) {
    const lapTime = Date.now() - lapStartTime;
    lapStartTime = Date.now(); // reset lap start time for next lap
    const MM = Math.floor(lapTime / 1000 / 60);
    const SS = Math.floor((lapTime / 1000) % 60);
    const MSS = lapTime % 1000;

    // Format lap time as MM:SS:MMM
    const formattedLapTime = `${pad(MM)}:${pad(SS)}:${padMilli(MSS)}`;
    laps.push(formattedLapTime);

    const lapItem = document.createElement("li");
    lapItem.textContent = formattedLapTime;
    lapList.appendChild(lapItem);
  }
});
