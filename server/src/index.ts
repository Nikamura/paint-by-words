import WebSocket from "ws";
import { getMessage } from "@pbw/core";
import * as Sentry from "@sentry/node";

const dsn = process.env.SENTRY_SDN;
if (dsn) {
  Sentry.init({ dsn });
}
const wss = new WebSocket.Server({ port: 8080 });

const roomHistory: Buffer[] = [];

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    if (!(data instanceof Buffer)) return;
    const message = getMessage(data);
    if (message) {
      console.log(message.toObject());
    }

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
        roomHistory.push(data);
      }
    });
  });
});
