import WebSocket from "ws";
import { Message, DrawLine, FloodFill } from "@pbn/messages";

const wss = new WebSocket.Server({ port: 8080 });

const roomHistory: Buffer[] = [];

wss.on("connection", function connection(ws) {
  // roomHistory.reverse().forEach(message => {
  //   ws.send(message);
  // });

  ws.on("message", function incoming(data) {
    console.log("INC", data)
    if (!(data instanceof Buffer)) return;

    const message = Message.deserializeBinary(data);
    switch (message.getMessagetype()) {
      case 1:
        const drawLine = DrawLine.deserializeBinary(
          message.getPayload_asU8()
        );
        console.log("drawLine command received", drawLine);
        break;
      case 2:
        const floodFill = FloodFill.deserializeBinary(message.getPayload_asU8())
        console.log("floodFill command received", floodFill);
        break;
      default:
        break;
    }

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
        roomHistory.push(data);
      }
    });
  });
});
