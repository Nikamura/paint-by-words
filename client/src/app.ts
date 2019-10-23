import Client from "~client";
import { getDocumentFromTemplate } from "./getDocumentFromTemplate";
import { GameBoard } from "~game-board";

export class App {
  private appContainer: HTMLElement;
  private client: Client;
  private gameBoard?: GameBoard;
  private _connected: boolean = false;

  constructor(serverUrl: string) {
    this.appContainer = document.getElementById("app");
    this.client = new Client(serverUrl);
    this.client.connect().then(() => (this.connected = true));
  }

  get connected() {
    return this._connected;
  }

  set connected(connected: boolean) {
    this._connected = connected;
    this.renderBoard();
  }

  renderBoard() {
    const fetchingNode = getDocumentFromTemplate("game-board");
    const board = fetchingNode.querySelector("canvas");
    this.gameBoard = new GameBoard(board);
    this.gameBoard.on("drawLine", (event: { x0; y0; x1; y1 }) => {
      this.client.drawLine(event);
    });
    this.gameBoard.render();
    this.appContainer.appendChild(board);
  }

  renderLogin() {
    const fetchingNode = getDocumentFromTemplate("login-template");
    const username = fetchingNode.querySelector("input");
    fetchingNode.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();
      if (username.value) this.client.register(username.value);
    });
    this.appContainer.appendChild(fetchingNode);
  }
}
