import { Message, DrawLine, Register, FloodFill } from "@pbw/messages";

export type Constructable<T> = new (...args: any[]) => T;

type MessageType = DrawLine | Register | FloodFill;

const messageMap = new Map<
  Message.MessageTypeMap[keyof Message.MessageTypeMap],
  Constructable<MessageType>
>([[1, DrawLine], [2, FloodFill], [3, Register]]);

export function getMessage(data: Buffer): MessageType | void {
  const message = Message.deserializeBinary(new Uint8Array(data));

  const messageType = message.getMessagetype();
  const messageClass = messageMap.get(messageType);
  if (!messageClass) {
    console.error("Unidentified message received", messageType);
    return;
  }

  return (<any>messageClass).deserializeBinary(message.getPayload_asU8());
}
