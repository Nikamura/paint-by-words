import { App } from "~app";
import { getDocumentFromTemplate } from "~getDocumentFromTemplate";

export class Chat {
  private document = getDocumentFromTemplate("chat-template");
  constructor(private app: App) {}

  private setupForm(): void {
    const form = this.document.querySelector("form");
    const messageInput = this.document.querySelector("input");

    form.addEventListener("submit", ev => {
      ev.preventDefault();
      console.log("Sending message", messageInput.value);
    });
  }

  public render(): void {
    this.setupForm();
    this.app.container.appendChild(this.document);
  }
}
