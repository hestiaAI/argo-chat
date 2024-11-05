// src/components/ArgoChat.ts
import { LitElement, html, unsafeCSS } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property } from 'lit/decorators.js';
import { DEFAULT_OPTIONS } from '../constants';

import type { Message } from '../types/chat';
import type { ChatOptions, ChatConfig } from '../types/options';
import { mergeConfig } from '../utils/merge';
import { convertToPx } from '../utils/tools';
import { baseStyle } from '../styles/base';

// Import default icons
// @ts-ignore
import defaultChatIcon from '../assets/svg/chat-icon.svg?raw';
// @ts-ignore
import defaultUserIcon from '../assets/svg/user-icon.svg?raw';
// @ts-ignore
import defaultAssistantIcon from '../assets/svg/assistant-icon.svg?raw';

// @ts-ignore
import tailwindCss from '../styles/tailwind.css?inline';

@customElement('argo-chat')
export class ArgoChat extends LitElement {
    @property({ type: Boolean, attribute: false })
    loading: boolean | undefined;

    @property({ type: Boolean, attribute: false })
    isOpen: boolean | undefined;

    @property({ type: Array, attribute: false })
    messages: Array<Message>;

    @property({ type: Object })
    options: ChatOptions;

    constructor(options: Partial<ChatConfig> = {}, openOnLoad = true) {
        super();
        this.loading = false;
        this.isOpen = openOnLoad;
        this.messages = [];
        this.options = mergeConfig(DEFAULT_OPTIONS, options);
    }

    static styles = [baseStyle, unsafeCSS(tailwindCss)];

    // Method to update options at runtime
    public updateOptions(newOptions: Partial<ChatOptions>): void {
        this.options = mergeConfig(this.options, newOptions);
    }
    private _renderIcon(
        icon: string | undefined,
        defaultIcon: string,
        size: string,
        additionalClasses: string = '',
    ): unknown {
        const iconContent = icon || defaultIcon;
        const cleanedIcon = iconContent.replace(
            /(width|height)=["'].*?["']/g,
            '',
        );
        return html`
            <div
                class="flex items-center justify-center text-on-primary ${additionalClasses}"
                style="width: ${size}; height: ${size};"
            >
                ${unsafeHTML(cleanedIcon)}
            </div>
        `;
    }

    render() {
        // Update CSS variables based on theme options
        this.style.setProperty(
            '--primary-color',
            this.options.theme.primaryColor,
        );
        this.style.setProperty('--text-color', this.options.theme.textColor);
        this.style.setProperty('--font-family', this.options.theme.fontFamily);

        const position =
            this.options.position === 'bottom-left' ? 'left-5' : 'right-5';
        const windowPosition =
            this.options.position === 'bottom-left' ? 'left-0' : 'right-0';
        const toggleButtonSize = convertToPx(
            this.options.toggleButton.btn_size,
        );
        const toggleIconSize = convertToPx(this.options.toggleButton.icon_size);

        return html`
            <div class="fixed z-50 bottom-5 ${position} chat-window">
                ${this.isOpen
                    ? html`
                          <div
                              class="absolute ${windowPosition} bottom-[calc(100%+1rem)]"
                          >
                              <div
                                  class="bg-white rounded-xl shadow-xl flex flex-col overflow-hidden w-80 sm:w-96 h-[32rem]"
                              >
                                  <!-- Header -->
                                  <div
                                      class="flex justify-between items-center p-4 bg-primary"
                                  >
                                      <div class="flex items-center space-x-2">
                                          <span class="font-medium"
                                              >${this.options.title}</span
                                          >
                                      </div>
                                      <button
                                          @click=${this._handleClose}
                                          class="p-1 rounded-full hover:bg-white/10 transition-colors"
                                      >
                                          <svg
                                              class="w-6 h-6"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                          >
                                              <path
                                                  d="M6 18L18 6M6 6l12 12"
                                                  stroke-width="2"
                                                  stroke-linecap="round"
                                              />
                                          </svg>
                                      </button>
                                  </div>

                                  <!-- Messages -->
                                  <div
                                      class="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50"
                                  >
                                      ${this.messages.map((msg) =>
                                          this._renderMessage(msg),
                                      )}
                                  </div>

                                  <!-- Loader -->
                                  ${this.loading
                                      ? html`
                                            <div
                                                class="flex items-center justify-center p-4 bg-gray-50"
                                            >
                                                <svg
                                                    class="w-6 h-6 animate-spin text-primary"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        d="M12 4v.01M12 8v.01M12 12v.01M12 16v.01M16.24 7.76l-1.42 1.42M17.66 12l-1.42 1.42M16.24 16.24l-1.42 1.42M12 17.66l-1.42 1.42M7.76 16.24l-1.42 1.42M6.34 12l-1.42 1.42M7.76 7.76l-1.42 1.42"
                                                        stroke-width="2"
                                                        stroke-linecap="round"
                                                    />
                                                </svg>
                                            </div>
                                        `
                                      : null}

                                  <!-- Input -->
                                  <div class="p-4 bg-white border-t">
                                      <div class="flex space-x-2">
                                          <input
                                              type="text"
                                              class="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2"
                                              style="--tw-ring-color: var(--primary-color)"
                                              placeholder=${this.options
                                                  .placeholder}
                                              @keyup=${this._handleKeyPress}
                                          />
                                          <button
                                              @click=${this._handleSend}
                                              class="text-primary p-2 rounded-full transition-colors "
                                          >
                                              <svg
                                                  class="w-6 h-6"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  viewBox="0 0 24 24"
                                              >
                                                  <path
                                                      d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                                                      stroke-width="2"
                                                      stroke-linecap="round"
                                                  />
                                              </svg>
                                          </button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      `
                    : null}

                <!-- Toggle Button -->

                <button
                    @click=${this._handleToggle}
                    class="chat-button rounded-full shadow-lg transition-transform hover:scale-110 bg-primary flex items-center justify-center"
                    style="width: ${toggleButtonSize}; height: ${toggleButtonSize}"
                >
                    ${this._renderIcon(
                        this.options.toggleButton.icon,
                        defaultChatIcon,
                        toggleIconSize,
                    )}
                </button>
            </div>
        `;
    }

    private _renderMessage(msg: Message) {
        const isUser = msg.role === 'user';
        const iconSize = '2rem'; // TODO: Add this in the options
        const participant = isUser
            ? this.options.user_icon
            : this.options.assistant_icon;
        const defaultIcon = isUser ? defaultUserIcon : defaultAssistantIcon;
        const iconBgColor = isUser ? 'bg-primary' : 'bg-gray-400';

        return html`
            <div
                class="flex items-center ${isUser
                    ? 'flex-row-reverse'
                    : 'flex-row'} gap-2"
            >
                <div
                    class="flex-shrink-0 flex items-center justify-center"
                    style="min-width: ${iconSize};"
                >
                    ${this._renderIcon(
                        participant,
                        defaultIcon,
                        iconSize,
                        `rounded-full ${iconBgColor} text-white p-1`,
                    )}
                </div>

                <div
                    class="max-w-[80%] px-4 py-2 rounded-xl 
                    ${isUser
                        ? 'user-message rounded-tr-none'
                        : 'assistant-message rounded-tl-none shadow-sm'}"
                >
                    ${msg.content}
                </div>
            </div>
        `;
    }

    private _handleToggle() {
        this.isOpen = !this.isOpen;
        this.dispatchEvent(new CustomEvent(this.isOpen ? 'open' : 'close'));
    }

    private _handleClose() {
        this.isOpen = false;
        this.dispatchEvent(new CustomEvent('close'));
    }

    private _handleKeyPress(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            this._handleSend();
        }
    }

    private validateApiConfig(): { isValid: boolean; error?: string } {
        if (!this.options.apiEndpoint) {
            return {
                isValid: false,
                error: 'API endpoint is not configured. Please set a valid endpoint in the options.',
            };
        }

        try {
            new URL(this.options.apiEndpoint);
        } catch (e) {
            return {
                isValid: false,
                error: `Invalid API endpoint URL: ${this.options.apiEndpoint}`,
            };
        }

        if (!this.options.apiKey) {
            return {
                isValid: false,
                error: 'API key is not configured. Please set a valid API key in the options.',
            };
        }

        return { isValid: true };
    }

    private _responseErrorMsg(req: Response) {
        if (req.status === 404) {
            return '⚠️ Configuration Error: Invalid API endpoint URL.';
        } else if (req.status === 401) {
            return '⚠️ Configuration Error: Invalid API key.';
        } else if (req.status === 500) {
            return 'Internal server error, please try again later.';
        } else {
            return `Unknown error ${req.status}: ${req.statusText}`;
        }
    }

    private async _handleSend() {
        const input = this.shadowRoot?.querySelector(
            'input',
        ) as HTMLInputElement;
        const userMessage = input.value.trim();

        if (!userMessage) return;

        // Validate API configuration first
        const configValidation = this.validateApiConfig();
        if (!configValidation.isValid) {
            this._addMessage({
                content: `⚠️ Configuration Error: ${configValidation.error}`,
                role: 'assistant',
            });
            return;
        }
        input.value = '';
        this._addMessage({
            content: userMessage,
            role: 'user',
        });

        this.loading = true;
        const query = {
            messages: [
                ...this.messages.slice(1).slice(-10),
                { content: userMessage, role: 'user' },
            ],
            model: 'gpt-3.5-turbo',
            stream: true,
        };

        try {
            const response = await fetch(this.options.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.options.apiKey}`,
                },
                body: JSON.stringify(query),
            });

            if (!response.ok || !response.body) {
                throw new Error(this._responseErrorMsg(response));
            }

            this._addMessage({ content: '', role: 'assistant' });

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let message = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter((line) => line.trim());

                for (const line of lines) {
                    try {
                        const cleanLine = line.replace(/^data: /, '').trim();
                        if (cleanLine === '[DONE]') continue;

                        const parsed = JSON.parse(cleanLine);
                        message += parsed.choices[0].delta.content || '';

                        this._updateLastMessage({
                            content: message,
                            role: 'assistant',
                        });
                    } catch (e) {
                        console.warn('Error parsing stream chunk:', e);
                    }
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);

            let errorMessage = 'An error occurred while sending the message.';

            if (error instanceof Error) {
                if (error.message.includes('Failed to fetch')) {
                    errorMessage =
                        '⚠️ Network Error: Could not connect to the API. Please check your internet connection or the API URL.';
                } else if (error.message.includes('NetworkError')) {
                    errorMessage =
                        '⚠️ Network Error: Connection failed. This might be due to CORS or network connectivity issues.';
                } else if (error.message.includes('abort')) {
                    errorMessage =
                        '⚠️ Request timeout: The API request took too long to respond.';
                } else {
                    errorMessage = `${error.message}`;
                }
            }

            this._addMessage({
                content: errorMessage,
                role: 'assistant',
            });
        } finally {
            this.loading = false;
        }
    }
    private _updateLastMessage(message: Message) {
        this.messages[this.messages.length - 1] = message;
        this.requestUpdate(); // force re-render

        // Scroll to bottom
        this.updateComplete.then(() => {
            const messages = this.shadowRoot?.querySelector('.overflow-y-auto');
            if (messages) {
                messages.scrollTop = messages.scrollHeight;
            }
        });
    }

    private _addMessage(message: Message) {
        this.messages = [...this.messages, message];

        // Scroll to bottom
        this.updateComplete.then(() => {
            const messages = this.shadowRoot?.querySelector('.overflow-y-auto');
            if (messages) {
                messages.scrollTop = messages.scrollHeight;
            }
        });
    }

    protected firstUpdated() {
        if (this.options.greeting) {
            this._addMessage({
                content: this.options.greeting,
                role: 'assistant',
            });
        }
    }
}
