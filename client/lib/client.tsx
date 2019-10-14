import React from "react";

type Callback = ((payload: any) => void);

export class Client {
  public connection?: WebSocket;

  public connected = false;

  private callbacks = new Map<string, Callback[]>();

  public send(action: string, payload: any): void {
      this.connection && this.connection.send(JSON.stringify({ action, payload }))
  }

  public connect(onConnect?: (ev: Event) => void): void {
    const connection = new WebSocket("ws://localhost:8080/");
    connection.binaryType = "arraybuffer"
    if (onConnect) connection.onopen = onConnect;
    connection.onmessage = event => {
      console.info("WebSocket message received:", event);
      const { data } = event;
      const parsedData = JSON.parse(data)
      if (parsedData.action) {
        const callbacks = this.callbacks.get(parsedData.action) || [];
        callbacks.forEach(callback => {
          console.log(callback)
          callback(parsedData.payload)
        })
      }
    };
    this.connection = connection;
    this.connected = true;
  }

  public on(action: string, callback: Callback): void {
    const callbacks: Callback[] = this.callbacks.get(action) || [];
    callbacks.push(callback);
    this.callbacks.set(action, callbacks);
  }
}
