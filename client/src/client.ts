import { Register, Message, DrawLine } from "@pbw/messages";

export default class Client {
  private serverUrl: string;
  private connection: WebSocket;

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
    const registerMessage = new DrawLine();
    registerMessage.setX0(x0);
    registerMessage.setY0(y0);
    registerMessage.setX1(x1);
    registerMessage.setY1(y1);
    const message = new Message();
    message.setMessagetype(1);
    message.setPayload(registerMessage.serializeBinary());
    this.connection.send(message.serializeBinary());
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
