import { Message } from './chat';

export interface ChatEvents {
    message: CustomEvent<Message>;
    open: CustomEvent<void>;
    close: CustomEvent<void>;
}
