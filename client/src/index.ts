import Client from "~client";

const client = new Client("ws://localhost:8080");
client.connect().then(() => {console.log("connected")});

const app = document.getElementById("app");
const loginTemplate = document.getElementById("login-template") as HTMLTemplateElement;
const fetchingNode = document.importNode(loginTemplate.content, true);
const username = fetchingNode.querySelector("input");
fetchingNode.querySelector("button").addEventListener("click", () => {
    console.log("Logging in as", username.value)
})
app.replaceWith(fetchingNode);
