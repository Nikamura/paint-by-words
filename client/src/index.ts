import { App } from "~app";

function getServerUrl(): string {
  const serverUrl = process.env.PAINT_BY_WORDS_SERVER_URL;
  if (!serverUrl) {
    if (process.env.NODE_ENV === "development") {
      return "ws://localhost:8080";
    }
    throw new Error("Missing server URL!");
  }
}

(() => {
  const serverUrl = getServerUrl();
  const painByWords = new App(serverUrl);
  global.painByWords = painByWords;
  global.serverUrl = serverUrl;
  painByWords.renderLogin();
})();
