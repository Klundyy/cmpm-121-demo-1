import "./style.css";

// Value Variables
let count = 0;

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

function countUpdate(){
    buttonCounter.innerHTML = count + " bears angered";
}

const buttonCounter = document.createElement("div");
countUpdate();
app.append(buttonCounter);

button.addEventListener("click", () => {
  count += 1;
  countUpdate();
});
setInterval(()=> {
    count += 1;
    countUpdate();
}, 1000)