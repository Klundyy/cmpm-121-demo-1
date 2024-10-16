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

const buttonCounter =  document.createElement("div");
buttonCounter.innerHTML = (count + " bears angered");
app.append(buttonCounter);

button.addEventListener("click", () => {
    count+=1;
    buttonCounter.innerHTML = (count + " bears angered");
});
