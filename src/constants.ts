import { ChatOptions } from './types/options';

export const DEFAULT_OPTIONS: ChatOptions = {
    title: 'Argo Chat',
    greeting: 'Hello! How can I help you today?',
    position: 'bottom-right',
    placeholder: 'Type a message...',
    apiEndpoint: 'https://api.argo-g.pt/v1/completions',
    apiKey: 'your_argonaut_api_key',
    theme: {
        primaryColor: '#3B82F6',
        textColor: '#FFFFFF',
        fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    toggleButton: {
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke-width="2" stroke-linecap="round"/></svg>',
        icon_size: '30px',
        btn_size: '60px',
    },
};
