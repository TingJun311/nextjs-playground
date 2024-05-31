// rateLimiter.ts

interface ClientRecord {
    count: number;
    lastRequest: number;
}

class RateLimiter {
    private clients: Map<string, ClientRecord>;
    private windowMs: number;
    private maxRequests: number;

    constructor(windowMs: number, maxRequests: number) {
        this.clients = new Map();
        this.windowMs = windowMs;
        this.maxRequests = maxRequests;
    }

    private resetClientRecord(clientId: string) {
        this.clients.set(clientId, { count: 0, lastRequest: Date.now() });
    }

    public checkRequest(clientId: string): boolean {
        const currentTime = Date.now();
        const clientRecord = this.clients.get(clientId);

        if (!clientRecord) {
            this.resetClientRecord(clientId);
            return true;
        }

        if (currentTime - clientRecord.lastRequest > this.windowMs) {
            this.resetClientRecord(clientId);
            return true;
        }

        if (clientRecord.count < this.maxRequests) {
            clientRecord.count++;
            clientRecord.lastRequest = currentTime;
            this.clients.set(clientId, clientRecord);
            return true;
        }

        return false;
    }
}

export default RateLimiter;
