import { css } from 'lit';

export const baseStyle = css`
    .text-primary {
        color: var(--primary-color);
    }

    .text-on-primary {
        color: var(--text-color);
    }

    .chat-window {
        font-family: var(--font-family) !important;
    }

    .chat-button:hover {
        color: color-mix(in srgb, var(--primary-color) 70%, white);
    }

    .bg-primary {
        background-color: var(--primary-color);
        color: var(--text-color);
    }

    .user-message {
        background-color: var(--primary-color);
        color: var(--text-color);
    }

    .assistant-message {
        background-color: white;
        color: #1f2937;
    }
`;
