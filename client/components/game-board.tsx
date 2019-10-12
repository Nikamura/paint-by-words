import React, {
  useState,
  MouseEventHandler,
  MouseEvent
} from "react";

import reverseUint32 from "./reverse-u32"

type Color = Uint32Array | number;

type PixelData = {
  width: number;
  height: number;
  data: Uint32Array;
}

const GameBoard: React.FC = () => {
  const gameBoard = React.createRef<HTMLCanvasElement>();
  const [color,  setColor] =  useState(0x2F395DFF)
  const bb = () => gameBoard.current!.getBoundingClientRect();
  const getContext = () => gameBoard.current!.getContext("2d")!;
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseLoc, setMouseLoc] = useState([0, 0]);
  console.log(mouseLoc);
  const onMouseDown: MouseEventHandler = e => {
    getContext().beginPath();
    if (!mouseDown) setMouseDown(true);
  };

  const onMouseUp = () => setMouseDown(false);
  const onMouseMove: MouseEventHandler = e => {
    e.preventDefault();
    if (mouseDown && !useFillBucket) {
      setMouseLoc([e.pageX, e.pageY]);
      const context = getContext();
      context.lineWidth = 1;
      context.strokeStyle = `#${color.toString(16)}`;
      context.lineJoin = context.lineCap = "round";
      context.lineTo(e.pageX - bb().left, e.pageY - bb().top);
      context.stroke();
    }
  };

  const [useFillBucket, setUseFillBucket] = useState(false);
  const getEventPosition = (e: MouseEvent) => {
    return [e.pageX - bb().left, e.pageY - bb().top];
  };

  const getPixel = (pixelData: PixelData, x: number, y: number): Color => {
    if (x < 0 || y < 0 || x >= pixelData.width || y >= pixelData.height) {
      return -1;  // impossible color
    } else {
      return pixelData.data[y * pixelData.width + x];
    }
  };

  const floodFill = (x: number, y: number, fillColor: number) => {
    const ctx = getContext();

    const imageData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );

    const pixelData = {
      width: imageData.width,
      height: imageData.height,
      data: new Uint32Array(imageData.data.buffer),
    };

    const targetColor = getPixel(pixelData, x, y);

    // console.log("targetColor", targetColor)
    // console.log("fillColor", fillColor)
    if (targetColor !== fillColor) {
      const queue = [[x, y]];
      while (queue.length > 0) {
        const [x, y] = queue.pop()!;
        // console.log("[x, y]", x, y)
        const currentCollor = getPixel(pixelData, x, y);
        // console.log("currentCollor", currentCollor)
        // console.log("targetColor", targetColor)
        if (targetColor === currentCollor) {
          const [r,g,b] = color.toString(16).match(/.{1,2}/g)!


          pixelData.data[y * pixelData.width + x] = reverseUint32(fillColor);
          queue.push([x + 1, y]);
          queue.push([x - 1, y]);
          queue.push([x, y + 1]);
          queue.push([x, y - 1]);
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }
  };

  const onClick: MouseEventHandler = e => {
    if (useFillBucket) {
      const [x, y] = getEventPosition(e);
      // console.log("FILLING", color, color.toString(16).match(/.{1,3}/g), parseInt(color.toString(16), 16))
      floodFill(x, y, color);
    }
  };
  const colors = [0x2F395DFF,
    0x3A4D52FF,
    0xE74025FF,
    0xEB7A3EFF,
    0xF4DA83FF]
  return (
    <div>
      <button
        style={{ backgroundColor: useFillBucket ? "red" : "white" }}
        onClick={() => setUseFillBucket(!useFillBucket)}
      >
        Fill bucket
      </button>
      <br/>
      {colors.map((color, index) => (
        <button key={index} style={{ backgroundColor: `#${color.toString(16)}` }} onClick={() => setColor(color)}>X</button>
      ))}
      <br/>
      <canvas
        ref={gameBoard}
        style={{ border: "1px solid cyan" }}
        width={400}
        height={300}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      />
    </div>
  );
};

export default GameBoard;
