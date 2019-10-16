import React, {
  useState,
  MouseEventHandler,
  MouseEvent,
  useEffect
} from "react";

import { throttle } from "../lib/throttle";
import { useConnection } from "./connection";
import { DrawLine, Message } from "@pbn/messages";
import { drawGrid } from "../lib/draw-grid";

const GameBoard: React.FC = () => {
  const gameBoard = React.createRef<HTMLCanvasElement>();
  const color = 0x2f395dff;
  const [context, setContext] = useState<CanvasRenderingContext2D | null>();
  const [drawing, setDrawing] = useState(false);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const { client, connected } = useConnection();
  const [gridFinished, setGridFinished] = useState(false);
  
  const onMouseDown: MouseEventHandler = e => {
    setDrawing(true);
    const [x, y] = getEventPosition(e);
    setCurrentX(x);
    setCurrentY(y);
  };

  useEffect(() => {
    if (gameBoard.current) {
      const context = gameBoard.current.getContext("2d");
      setContext(context);
      if (!gridFinished && context) {
        drawGrid(context);
        setGridFinished(true);
      }
    }
  }, [gameBoard, gridFinished]);

  const onMouseUp: MouseEventHandler = e => {
    if (!drawing) return;
    setDrawing(false);
    const [x, y] = getEventPosition(e);
    drawLine(currentX, currentY, x, y);
  };

  client.connection!.onmessage = event => {
    console.log("Incoming message", event);
    if (!context) return;

    const message = Message.deserializeBinary(new Uint8Array(event.data));
    switch (message.getMessagetype()) {
      case 1:
        const drawLineMsg = DrawLine.deserializeBinary(
          message.getPayload_asU8()
        ).toObject();
        drawLine(
          drawLineMsg.x0,
          drawLineMsg.y0,
          drawLineMsg.x1,
          drawLineMsg.y1,
          false
        );
        break;
      default:
        console.log("Unidentified message", message.getMessagetype());
        break;
    }
  };

  const drawLine = (
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    emit: boolean = true
  ) => {
    if (!context) return;
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = `#${color.toString(16)}`;
    context.lineWidth = 1;
    context.stroke();
    context.closePath();

    if (connected && emit) {
      const drawLine = new DrawLine();
      drawLine.setX0(x0);
      drawLine.setY0(y0);
      drawLine.setX1(x1);
      drawLine.setY1(y1);
      const message = new Message();
      message.setMessagetype(1);
      message.setPayload(drawLine.serializeBinary());
      client.connection && client.connection.send(message.serializeBinary());
    }
  };

  const onMouseMove: MouseEventHandler = e => {
    if (!drawing) return;
    const [x, y] = getEventPosition(e);
    drawLine(currentX, currentY, x, y);
    setCurrentX(x);
    setCurrentY(y);
  };

  const getEventPosition = (e: MouseEvent): [number, number] => {
    const { left, top } = gameBoard.current!.getBoundingClientRect();
    return [e.pageX - left, e.pageY - top];
  };

  return (
    <canvas
      ref={gameBoard}
      width={401}
      height={401}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={throttle(onMouseMove, 10)}
    />
  );
};

export default GameBoard;
