export type EventCallback<T = any> = (event: CustomEvent<T>) => void;

export class EventEmitter {
    private listeners: Map<string, Set<EventCallback>> = new Map();

    on<T>(eventName: string, callback: EventCallback<T>): void {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, new Set());
        }
        this.listeners.get(eventName)!.add(callback);
    }

    off<T>(eventName: string, callback: EventCallback<T>): void {
        const callbacks = this.listeners.get(eventName);
        if (callbacks) {
            callbacks.delete(callback);
        }
    }

    emit<T>(eventName: string, detail?: T): void {
        const callbacks = this.listeners.get(eventName);
        if (callbacks) {
            const event = new CustomEvent(eventName, { detail });
            callbacks.forEach((callback) => callback(event));
        }
    }
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function (this: any, ...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func.apply(this, args);
        };

        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}
