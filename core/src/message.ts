export class Message {
    constructor(public action: string, public payload: any) {}

    public toString(): string {
        return JSON.stringify({ action: this.action, payload: this.payload })
    }
}
