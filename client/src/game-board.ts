import { throttle } from "~throttle";
import { EventEmitter } from "events";

export interface GameBoard {
  on(
    event: "drawLine",
    listener: (ev: { x0: number; y0: number; x1: number; y1: number }) => void
  ): this;

  drawLine(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    emit?: boolean
  ): void;
}

export type PixelData = {
  width: number;
  height: number;
  data: Uint32Array;
};

export class GameBoard extends EventEmitter {
  private color = "red";
  private drawing = false;
  private lineWidth = 1;
  private currentX = 0;
  private currentY = 0;
  private context: CanvasRenderingContext2D;

  constructor(private canvas: HTMLCanvasElement) {
    super();
    this.context = this.canvas.getContext("2d");
  }

  render() {
    this.setupMouse();
    this.setupTouch();
  }

  private setupTouch() {
    this.canvas.addEventListener("touchstart", event => {
      this.drawing = true;
      const [x, y] = this.getEventPosition(event);
      this.currentX = x;
      this.currentY = y;
    });

    this.canvas.addEventListener("touchend", event => {
      if (!this.drawing) return;
      this.drawing = false;
      const [x, y] = this.getEventPosition(event);
      this.drawLine(this.currentX, this.currentY, x, y);
    });

    this.canvas.addEventListener(
      "touchmove",
      throttle((event: MouseEvent) => {
        if (!this.drawing) return;
        const [x, y] = this.getEventPosition(event);
        this.drawLine(this.currentX, this.currentY, x, y);
        this.currentX = x;
        this.currentY = y;
      }, 10)
    );
  }

  private setupMouse() {
    this.canvas.addEventListener("mousedown", event => {
      this.drawing = true;
      const [x, y] = this.getEventPosition(event);
      this.currentX = x;
      this.currentY = y;
    });

    this.canvas.addEventListener("mouseup", event => {
      if (!this.drawing) return;
      this.drawing = false;
      const [x, y] = this.getEventPosition(event);
      this.drawLine(this.currentX, this.currentY, x, y);
    });

    this.canvas.addEventListener(
      "mousemove",
      throttle((event: MouseEvent) => {
        if (!this.drawing) return;
        const [x, y] = this.getEventPosition(event);
        this.drawLine(this.currentX, this.currentY, x, y);
        this.currentX = x;
        this.currentY = y;
      }, 10)
    );
  }

  public drawLine(x0: number, y0: number, x1: number, y1: number, emit = true) {
    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.lineWidth;
    this.context.stroke();
    this.context.closePath();
    if (emit) this.emit("drawLine", { x0, y0, x1, y1 });
  }

  public setColor(color: string, emit = true) {
    this.color = color;
    if (emit) this.emit("setColor", color);
  }

  public setLineWidth(lineWidth: number, emit = true) {
    this.lineWidth = lineWidth;
    if (emit) this.emit("setLineWidth", lineWidth);
  }

  private getEventPosition(e: MouseEvent | TouchEvent): [number, number] {
    const { left, top } = this.canvas.getBoundingClientRect();
    const pageX = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    const pageY = e instanceof MouseEvent ? e.pageY : e.touches[0].pageY;
    return [pageX - left, pageY - top];
  }
}
