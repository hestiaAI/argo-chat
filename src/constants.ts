import { ChatOptions } from './types/options';

export const DEFAULT_OPTIONS: ChatOptions = {
    title: 'Argo Chat',
    greeting: 'Hello! How can I help you today?',
    position: 'bottom-right',
    placeholder: 'Type a message...',
    apiEndpoint: 'https://api.argo-g.pt/v1/chat/completions',
    apiKey: 'your_argonaut_api_key',
    theme: {
        primaryColor: '#3B82F6',
        textColor: '#FFFFFF',
        fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    toggleButton: {
        icon: '',
        icon_size: '30px',
        btn_size: '60px',
    },
};
