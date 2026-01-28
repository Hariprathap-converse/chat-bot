/**
 * Mock WebSocket Implementation
 * Use this to simulate real WebSocket behavior in a local development environment.
 * It follows the standard WebSocket API, making it easy to swap for the real thing later.
 */

export class MockWebSocket {
    private listeners: Record<string, Function[]> = {};
    public readyState: number = 0; // 0: CONNECTING, 1: OPEN, 2: CLOSING, 3: CLOSED

    constructor(url: string) {
        console.log(`[MockWS] Connecting to ${url}...`);
        // Simulate connection delay
        setTimeout(() => {
            this.readyState = 1;
            this.dispatchEvent("open", {});
            console.log(`[MockWS] Connected!`);
        }, 1000);
    }

    public addEventListener(type: string, callback: Function) {
        if (!this.listeners[type]) this.listeners[type] = [];
        this.listeners[type].push(callback);
    }

    public removeEventListener(type: string, callback: Function) {
        if (!this.listeners[type]) return;
        this.listeners[type] = this.listeners[type].filter((cb) => cb !== callback);
    }

    private dispatchEvent(type: string, data: any) {
        if (!this.listeners[type]) return;
        this.listeners[type].forEach((callback) => callback(data));
    }

    public send(message: string) {
        console.log(`[MockWS] Client sent:`, message);

        // Auto-respond for demonstration
        setTimeout(() => {
            const response = {
                id: Date.now(),
                content: `Ack: ${message}`,
                timestamp: new Date().toISOString()
            };
            this.dispatchEvent("message", { data: JSON.stringify(response) });
        }, 500);
    }

    public close() {
        this.readyState = 2;
        setTimeout(() => {
            this.readyState = 3;
            this.dispatchEvent("close", {});
            console.log(`[MockWS] Connection closed.`);
        }, 100);
    }

    // Simplified event property support (onopen, onmessage, etc.)
    set onopen(callback: Function) { this.addEventListener("open", callback); }
    set onmessage(callback: Function) { this.addEventListener("message", callback); }
    set onerror(callback: Function) { this.addEventListener("error", callback); }
    set onclose(callback: Function) { this.addEventListener("close", callback); }
}

/**
 * Factory to get either a real WebSocket or the Mock one
 */
export function createChatConnection(url: string, useMock: boolean = true): WebSocket | MockWebSocket {
    if (useMock) {
        return new MockWebSocket(url) as any;
    }
    return new WebSocket(url);
}
