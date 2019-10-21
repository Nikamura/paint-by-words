export default class Client {
    private serverUrl: string;
    private connection: WebSocket;


    constructor(serverUrl: string) {
        this.serverUrl = serverUrl
    }

    public async connect(): Promise<WebSocket> {
        return new Promise<WebSocket>((resolve, reject) => {
            try {
                const connection = new WebSocket(this.serverUrl);
                connection.binaryType = "arraybuffer";
                connection.onopen = () => {
                    this.connection = connection;
                    resolve(connection);
                }
            } catch (e) {
                reject(e);
            }
        })
    }
}
