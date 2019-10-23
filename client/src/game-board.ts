import { throttle } from "~throttle";
import { EventEmitter } from "events";
// declare interface MyClass {
// on(event: 'hello', listener: (name: string) => void): this;
// on(event: string, listener: Function): this;
// }

// class MyClass extends events.EventEmitter {
//     emitHello(name: string): void {
//         this.emit('hello', name);
//     }
// }
// this.emit("drawLine", { x0, y0, x1, y1 });
export interface GameBoard {
  on(
    event: "drawLine",
    listener: (ev: { x0: number; y0: number; x1: number; y1: number }) => void
  ): this;
  //   on(event: string, listener: Function): this;
}

export class GameBoard extends EventEmitter {
  public color = "orange";
  public drawing = false;
  public currentX = 0;
  public currentY = 0;
  public context: CanvasRenderingContext2D;

  constructor(private el: HTMLCanvasElement) {
    super();
    const ctx = el.getContext("2d");
    if (!ctx) throw new Error("missing 2d context");
    this.context = ctx;
    super();
  }

  setupMouse() {
    this.el.addEventListener("mousedown", event => {
      this.drawing = true;
      const [x, y] = this.getEventPosition(event);
      this.currentX = x;
      this.currentY = y;
    });

    this.el.addEventListener("mouseup", event => {
      if (!this.drawing) return;
      this.drawing = false;
      const [x, y] = this.getEventPosition(event);
      this.drawLine(this.currentX, this.currentY, x, y);
    });

    this.el.addEventListener(
      "mousemove",
      throttle(event => {
        if (!this.drawing) return;
        const [x, y] = this.getEventPosition(event);
        this.drawLine(this.currentX, this.currentY, x, y);
        this.currentX = x;
        this.currentY = y;
      }, 10)
    );
  }

  render() {
    this.setupMouse();
    const ctx = this.context;
    ctx.beginPath();
    ctx.rect(20, 20, 150, 100);
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(40, 40, 150, 100);
    ctx.fillStyle = "blue";
    ctx.fill();
  }

  drawLine(x0: number, y0: number, x1: number, y1: number) {
    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.strokeStyle = this.color;
    this.context.lineWidth = 1;
    this.context.stroke();
    this.context.closePath();
    this.emit("drawLine", { x0, y0, x1, y1 });
  }

  getEventPosition(e: MouseEvent): [number, number] {
    const { left, top } = this.el.getBoundingClientRect();
    return [e.pageX - left, e.pageY - top];
  }
}
