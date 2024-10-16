import "./style.css";

// Value Variables
let count = 0;
let prevTime = performance.now();
let valueFraction = 0;

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Kuma Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🐻";
button.style.backgroundColor = "white";
button.style.borderColor = "black";
button.style.webkitTextFillColor = "white";
app.append(button);

function countUpdate() {
  buttonCounter.innerHTML = count + " bears angered";
}
function counterGrowth() {
  const now = performance.now();
  const timeDif = now - prevTime;
  prevTime = now;

  const increaseAmount = (timeDif / 1000) * valueFraction;
  count += increaseAmount;
  upgradeButton.disabled = 10 > count;
  countUpdate();
  requestAnimationFrame(counterGrowth);
}

const buttonCounter = document.createElement("div");
countUpdate();
app.append(buttonCounter);

button.addEventListener("click", () => {
  count += 1;
  countUpdate();
});
/*setInterval(() => {
  count += 1;
  countUpdate();
}, 1000);*/

requestAnimationFrame(counterGrowth);

const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Bear spray";
upgradeButton.disabled = true;
app.append(upgradeButton);

upgradeButton.addEventListener("click", () => {
  if(count >= 10){
    count -= 10;
    valueFraction += 1;
  }
})