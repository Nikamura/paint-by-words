export function drawGrid(context: CanvasRenderingContext2D, { strokeStyle } = {
    strokeStyle: "rgba(0,0,0,0.1)"
}) {
  const width = context.canvas.width;
  const height = context.canvas.height;

  for (let x = 0; x <= width; x += 20) {
    context.moveTo(0.5 + x, 0);
    context.lineTo(0.5 + x, height);
  }

  for (let x = 0; x <= height; x += 20) {
    context.moveTo(0, 0.5 + x);
    context.lineTo(width, 0.5 + x);
  }

  context.strokeStyle = strokeStyle;
  context.stroke();
}

export default drawGrid;
