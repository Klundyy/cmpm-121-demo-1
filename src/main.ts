import "./style.css";

interface Item {
  name: string,
  cost: number,
  rate: number,
  count: number,
};

// Value Variables
let count = 0;
let prevTime = performance.now();
let valueFraction = 0;

const app: HTMLDivElement = document.querySelector("#app")!;

// Game Name
const gameName = "Kuma Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Bear Click Button Elements
const button = document.createElement("button");
button.innerHTML = "🐻";
button.style.backgroundColor = "white";
button.style.borderColor = "black";
button.style.webkitTextFillColor = "white";
app.append(button);

// Counter Element
const buttonCounter = document.createElement("div");
countUpdate();
app.append(buttonCounter);

const growthDisplay = document.createElement("div");

function countUpdate() {
  buttonCounter.innerHTML = count.toFixed(1) + " bears angered";
}
function counterGrowth() {
  // Get time passed
  const now = performance.now();
  const timeDif = now - prevTime;
  prevTime = now;

  // Increase count by time passed and multiplier
  const increaseAmount = (timeDif / 1000) * valueFraction;
  count += increaseAmount;
  growthDisplay.innerHTML = `Growth rate: ${valueFraction.toFixed(1)}`;
  unlockUpgrade();
  countUpdate();
  requestAnimationFrame(counterGrowth);
}

// Button click handler
button.addEventListener("click", () => {
  count += 1;
  countUpdate();
});
requestAnimationFrame(counterGrowth);

// List of upgrades
const upgradeList: Item[] = [
  { name: "Bear Spray", cost: 10, rate: 0.1, count: 0 },
  { name: "Bear Box📦", cost: 100, rate: 2.0, count: 0 },
  { name: "Tranquilizer Dart💉", cost: 1000, rate: 50.0, count: 0 },
];
const upgradeButtonList: HTMLButtonElement[] = [];

// Iterate through list of upgrades and setup for each
upgradeList.forEach((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost})`;
  upgradeButton.disabled = true;
  upgradeButtonList.push(upgradeButton);
  const upgradePurchase = document.createElement("div");
  upgradePurchase.innerHTML = `${upgrade.name} (Purchased: ${upgrade.count})`;
  upgradeButton.addEventListener("click", () => {
    if (count >= upgrade.cost) {
      count -= upgrade.cost;
      valueFraction += upgrade.rate;
      upgrade.count += 1;
      upgrade.cost *= 1.15;
      upgradeButton.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost.toFixed(2)})`;
      upgradePurchase.innerHTML = `${upgrade.name} (Purchased: ${upgrade.count})`;
    }
  });
  app.append(upgradeButton);
  app.append(upgradePurchase);
});
// Check for when count is greater than cost
function unlockUpgrade() {
  upgradeList.forEach((upgrade, index) => {
    upgradeButtonList[index].disabled = count < upgrade.cost;
  });
}

app.append(growthDisplay);
