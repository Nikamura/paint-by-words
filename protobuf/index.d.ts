// package: paint_by_words
// file: index.proto

import * as jspb from "google-protobuf";

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

export class CommandMessage extends jspb.Message {
  getCommand(): CommandMessage.CommandMap[keyof CommandMessage.CommandMap];
  setCommand(value: CommandMessage.CommandMap[keyof CommandMessage.CommandMap]): void;

  getPayload(): Uint8Array | string;
  getPayload_asU8(): Uint8Array;
  getPayload_asB64(): string;
  setPayload(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommandMessage.AsObject;
  static toObject(includeInstance: boolean, msg: CommandMessage): CommandMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CommandMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommandMessage;
  static deserializeBinaryFromReader(message: CommandMessage, reader: jspb.BinaryReader): CommandMessage;
}

export namespace CommandMessage {
  export type AsObject = {
    command: CommandMessage.CommandMap[keyof CommandMessage.CommandMap],
    payload: Uint8Array | string,
  }

  export interface CommandMap {
    UNDEFINED: 0;
    DRAW_LINE: 1;
  }

  export const Command: CommandMap;
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

