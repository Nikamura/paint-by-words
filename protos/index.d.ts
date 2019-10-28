// package: paint_by_words
// file: index.proto

import * as jspb from "google-protobuf";

export class Message extends jspb.Message {
  getMessagetype(): Message.MessageTypeMap[keyof Message.MessageTypeMap];
  setMessagetype(value: Message.MessageTypeMap[keyof Message.MessageTypeMap]): void;

  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    messagetype: Message.MessageTypeMap[keyof Message.MessageTypeMap],
    payload: Uint8Array | string,
  }

  export interface MessageTypeMap {
    UNDEFINED: 0;
    DRAW_LINE: 1;
    FLOOD_FILL: 2;
    REGISTER: 3;
  }

  export const MessageType: MessageTypeMap;
}

export class Player extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Player.AsObject;
  static toObject(includeInstance: boolean, msg: Player): Player.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Player, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Player;
  static deserializeBinaryFromReader(message: Player, reader: jspb.BinaryReader): Player;
}

export namespace Player {
  export type AsObject = {
    id: string,
    name: string,
  }
}

export class RoomType extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  clearColorList(): void;
  getColorList(): Array<number>;
  setColorList(value: Array<number>): void;
  addColor(value: number, index?: number): number;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RoomType.AsObject;
  static toObject(includeInstance: boolean, msg: RoomType): RoomType.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RoomType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RoomType;
  static deserializeBinaryFromReader(message: RoomType, reader: jspb.BinaryReader): RoomType;
}

export namespace RoomType {
  export type AsObject = {
    id: number,
    name: string,
    colorList: Array<number>,
  }
}

export class DrawLine extends jspb.Message {
  getX0(): number;
  setX0(value: number): void;

  getY0(): number;
  setY0(value: number): void;

  getX1(): number;
  setX1(value: number): void;

  getY1(): number;
  setY1(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DrawLine.AsObject;
  static toObject(includeInstance: boolean, msg: DrawLine): DrawLine.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DrawLine, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DrawLine;
  static deserializeBinaryFromReader(message: DrawLine, reader: jspb.BinaryReader): DrawLine;
}

export namespace DrawLine {
  export type AsObject = {
    x0: number,
    y0: number,
    x1: number,
    y1: number,
  }
}

export class FloodFill extends jspb.Message {
  getX(): number;
  setX(value: number): void;

  getY(): number;
  setY(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FloodFill.AsObject;
  static toObject(includeInstance: boolean, msg: FloodFill): FloodFill.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FloodFill, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FloodFill;
  static deserializeBinaryFromReader(message: FloodFill, reader: jspb.BinaryReader): FloodFill;
}

export namespace FloodFill {
  export type AsObject = {
    x: number,
    y: number,
  }
}

export class Register extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Register.AsObject;
  static toObject(includeInstance: boolean, msg: Register): Register.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Register, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Register;
  static deserializeBinaryFromReader(message: Register, reader: jspb.BinaryReader): Register;
}

export namespace Register {
  export type AsObject = {
    name: string,
  }
}

