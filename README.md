# Paint by words

It's a multiplayer drawing and guessing game. Draw and guess words with your friends. Score the most points and be the winner!

## Architecture

Communication between server and browser is done via WebSocket connection. Messages are sent in Protocol Buffers format. JavaScript and TypeScript files are generated from .proto files that are included in both server and client with the help of [google-protobuf](https://www.npmjs.com/package/google-protobuf).

The main communication happens using `Message` which encapsulates type of the message and another serialized Message, which is parsed appropiately based on message type.

## Client flow

- Fill username
- Click login
  - if url contains room number try to join the room
  - else join a random room
