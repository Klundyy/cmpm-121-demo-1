import "./style.css";

interface Item {
  name: string;
  cost: number;
  rate: number;
  amount: number;
  description: string;
}

// Value Variables
let count = 0;
let prevTime = performance.now();
let growthFactor = 0;
let killedBear = false;
const upgradeCostMultiplier = 1.15;
const clickAmount = 1;

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
app.append(growthDisplay);

function countUpdate() {
  if (killedBear) {
    buttonCounter.innerHTML = count.toFixed(1) + " bears killed";
  } else {
    buttonCounter.innerHTML = count.toFixed(1) + " bears angered";
  }
}
function counterGrowth() {
  // Get time passed
  const now = performance.now();
  const timeDif = now - prevTime;
  prevTime = now;

  // Increase count by time passed and multiplier
  const increaseAmount = (timeDif / 1000) * growthFactor;
  count += increaseAmount;
  growthDisplay.innerHTML = `Growth rate: ${growthFactor.toFixed(1)}`;
  unlockUpgrade();
  countUpdate();
  requestAnimationFrame(counterGrowth);
}

// Button click handler
button.addEventListener("click", () => {
  count += clickAmount;
  countUpdate();
});
requestAnimationFrame(counterGrowth);

// List of upgrades
const upgradeList: Item[] = [
  {
    name: "Bear Spray",
    cost: 10,
    rate: 0.1,
    amount: 0,
    description: "Protect yourself but only yourself",
  },
  {
    name: "Bear Box📦",
    cost: 100,
    rate: 2.0,
    amount: 0,
    description: "Protect your food",
  },
  {
    name: "Tranquilizer Dart💉",
    cost: 1000,
    rate: 50.0,
    amount: 0,
    description: "I hope this works",
  },
  {
    name: "Bigger Bear Gun🔫",
    cost: 5000,
    rate: 250.0,
    amount: 0,
    description: "This will work better",
  },
  {
    name: "Destroy Bear💀",
    cost: 50000,
    rate: 2500.0,
    amount: 0,
    description: "Your last hope",
  },
];
const upgradeButtonList: HTMLButtonElement[] = [];

// Iterate through list of upgrades and setup for each
upgradeList.forEach((upgrade) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost})`;
  upgradeButton.disabled = true;
  upgradeButtonList.push(upgradeButton);
  upgradeButton.title = upgrade.description;
  const upgradePurchase = document.createElement("div");
  upgradePurchase.innerHTML = `${upgrade.name} (Purchased: ${upgrade.amount})`;
  upgradeButton.addEventListener("click", () => {
    if (count >= upgrade.cost) {
      count -= upgrade.cost;
      growthFactor += upgrade.rate;
      upgrade.amount += 1;
      upgrade.cost *= upgradeCostMultiplier;
      upgradeButton.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost.toFixed(2)})`;
      upgradePurchase.innerHTML = `${upgrade.name} (Purchased: ${upgrade.amount})`;
      if (upgrade.name == "Destroy Bear💀") {
        button.innerHTML = "💀";
        killedBear = true;
      }
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
