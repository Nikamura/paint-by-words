import { Message } from "@pbn/messages";
// if (!(data instanceof Buffer)) return;
// console.log("Incoming message", event);
//     if (!context) return;

//     const message = Message.deserializeBinary(new Uint8Array(event.data));
//     switch (message.getMessagetype()) {
//       case 1:
//         const drawLineMsg = DrawLine.deserializeBinary(
//           message.getPayload_asU8()
//         ).toObject();
//         drawLine(
//           drawLineMsg.x0,
//           drawLineMsg.y0,
//           drawLineMsg.x1,
//           drawLineMsg.y1,
//           false
//         );
//         break;
//       default:
//         console.log("Unidentified message", message.getMessagetype());
//         break;
//     }

function getMessage(data: Buffer) {
  const message = Message.deserializeBinary(new Uint8Array(data));
}
