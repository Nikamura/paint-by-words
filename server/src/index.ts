import WebSocket from "ws";
import { CommandMessage, DrawLine } from "@pbn/messages"

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    if (!(data instanceof Buffer)) return;

    const commandMessage = CommandMessage.deserializeBinary(data);
    if (commandMessage.getCommand() === 1) {
      const drawLine = DrawLine.deserializeBinary(
        commandMessage.getPayload_asU8()
      );
      console.log("drawLine command received", drawLine)
    }
    
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
