import React, {
  useState,
  MouseEventHandler,
  useEffect,
  MouseEvent
} from "react";

type Color = Uint8ClampedArray | number[];

const GameBoard: React.FC = () => {
  const gameBoard = React.createRef<HTMLCanvasElement>();
  const [color,  setColor] =  useState([123,123,123])
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
      context.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      context.lineJoin = context.lineCap = "round";
      context.lineTo(e.pageX - bb().left, e.pageY - bb().top);
      context.stroke();
    }
  };

  const [useFillBucket, setUseFillBucket] = useState(false);
  const getEventPosition = (e: MouseEvent) => {
    return [e.pageX - bb().left, e.pageY - bb().top];
  };

  const getPixel = (imageData: ImageData, x: number, y: number): Color => {
    if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
      return [-1, -1, -1, -1]; // impossible color
    } else {
      const offset = (y * imageData.width + x) * 4;
      return imageData.data.slice(offset, offset + 4);
    }
  };

  function setPixel(imageData: ImageData, x: number, y: number, color: Color) {
    const offset = (y * imageData.width + x) * 4;
    imageData.data[offset + 0] = color[0];
    imageData.data[offset + 1] = color[1];
    imageData.data[offset + 2] = color[2];
    imageData.data[offset + 3] = 255;
  }
  function colorsMatch(a: any, b: any) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }

  const floodFill = (x: number, y: number, fillColor: Color) => {
    const ctx = getContext();

    const imageData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );

    const targetColor = getPixel(imageData, x, y);
    console.log("fillColor", fillColor)

    if (!colorsMatch(targetColor, fillColor)) {
      const queue = [[x, y]];
      while (queue.length > 0) {
        // console.log(queue.length)
        const [newX, newY] = queue.pop()!;
        const newPixel = getPixel(imageData, newX, newY);
        if (colorsMatch(targetColor, newPixel)) {
          setPixel(imageData, newX, newY, fillColor);
          if (newX + 1 < ctx.canvas.width) queue.push([newX + 1, newY]);
          if (newX - 1 > 0) queue.push([newX - 1, y]);
          if (newY + 1 < ctx.canvas.height) queue.push([newX, newY + 1]);
          if (newY - 1 > 0) queue.push([newX, newY - 1]);
        }
      }
      ctx.putImageData(imageData, 0, 0);
    }
  };

  const onClick: MouseEventHandler = e => {
    if (useFillBucket) {
      const [x, y] = getEventPosition(e);
      floodFill(x, y, [...color, 1]);
    }
  };
  const colors = [[0,0,0],[0,0,128],[0,0,255],[0,128,0],[0,128,128],[0,255,0],[0,255,255],[128,0,0],[128,0,128],[128,128,0],[128,128,128],[192,192,192],[255,0,0],[255,0,255],[255,255,0],[255,255,255]]
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
        <button key={index} style={{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }} onClick={() => setColor(color)}>X</button>
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
