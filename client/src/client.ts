import { Register, Message, DrawLine } from "@pbw/messages";
import { createMessage } from "@pbw/core";

export default class Client {
  private serverUrl: string;
  public connection: WebSocket;

  constructor(serverUrl: string) {
    this.serverUrl = serverUrl;
  }

  public register(username: string): void {
    const registerMessage = new Register();
    registerMessage.setName(username);
    const message = new Message();
    message.setMessagetype(3);
    message.setPayload(registerMessage.serializeBinary());
    this.connection.send(message.serializeBinary());
  }

  public drawLine({
    x0,
    y0,
    x1,
    y1
  }: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  }) {
    const drawLineMessage = new DrawLine();
    drawLineMessage.setX0(x0);
    drawLineMessage.setY0(y0);
    drawLineMessage.setX1(x1);
    drawLineMessage.setY1(y1);
    const message = createMessage(drawLineMessage).serializeBinary();
    this.connection.send(message);
  }

  public async connect(): Promise<WebSocket> {
    return new Promise<WebSocket>((resolve, reject) => {
      try {
        const connection = new WebSocket(this.serverUrl);
        connection.binaryType = "arraybuffer";
        connection.onopen = () => {
          this.connection = connection;
          resolve(connection);
        };
        connection.addEventListener("message", event => {
          console.info("WebSocket message received:", event);
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}
