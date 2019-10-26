import Client from "~client";
import { getDocumentFromTemplate } from "./getDocumentFromTemplate";
import { GameBoard } from "~game-board";
import { getMessage } from "@pbw/core";
import { DrawLine } from "@pbw/messages";
import { Chat } from "~chat";

export class App {
  public readonly container: HTMLElement;
  private client: Client;
  private gameBoard?: GameBoard;
  private _connected = false;

  constructor(serverUrl: string) {
    this.container = document.getElementById("app");
    this.client = new Client(serverUrl);
    this.client
      .connect()
      .then(() => {
        this.connected = true;

        this.client.connection.addEventListener("message", event => {
          const message = getMessage(event.data);
          if (message instanceof DrawLine) {
            this.gameBoard.drawLine(
              message.getX0(),
              message.getY0(),
              message.getX1(),
              message.getY1(),
              false
            );
          }
          console.log("PARSED_MESSAGE", message);
        });
      })
      .catch(e => console.error("Error connecting to game server", e));
  }

  get connected() {
    return this._connected;
  }

  set connected(connected: boolean) {
    this._connected = connected;
  }

  public renderChat(): void {
    new Chat(this).render();
  }

  renderBoard() {
    const fetchingNode = getDocumentFromTemplate("game-board-template");
    this.gameBoard = new GameBoard(fetchingNode.querySelector("canvas"));
    this.gameBoard.on("drawLine", (event: { x0; y0; x1; y1 }) => {
      if (this.connected) this.client.drawLine(event);
    });
    this.gameBoard.render();
    this.container.appendChild(fetchingNode);
  }

  renderLogin() {
    const fetchingNode = getDocumentFromTemplate("login-template");
    const username = fetchingNode.querySelector("input");
    fetchingNode.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      if (username.value) this.client.register(username.value);
    });
    this.container.appendChild(fetchingNode);
    this.renderBoard();
    this.renderChat();
  }
}
