import WebSocket from "ws";
import { Player } from "core/dist/player"
import { LoginMessage} from "core/dist/login.message"

const wss = new WebSocket.Server({ port: 8080 });
const players: Player[] = [];

wss.on("connection", function connection(ws) {
  const player = new Player();
  players.push(player);
  ws.send(new LoginMessage(player).toString())
  
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);

      }
    });
  });
});
