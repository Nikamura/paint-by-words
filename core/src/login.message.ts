import { Message } from "./message";
import { Player } from "./player";

export class LoginMessage extends Message {
    constructor(player: Player) {
        super("yourDetails", player);
    }
}
