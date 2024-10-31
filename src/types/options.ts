export interface ThemeConfig {
    primaryColor?: string;
    textColor?: string;
    fontFamily?: string;
}

export interface ToggleButtonConfig {
    icon?: string;
    icon_size?: string;
    btn_size?: string;
}

export interface ChatConfig {
    title?: string;
    apiKey?: string;
    apiEndpoint?: string;
    greeting?: string;
    position?: 'bottom-right' | 'bottom-left';
    placeholder?: string;
    theme?: ThemeOptions;
    user_icon?: string;
    assistant_icon?: string;
    toggleButton?: ToggleButtonOptions;
}

export interface ThemeOptions {
    primaryColor: string; // Primary color (hex format)
    textColor: string; // Text color on primary background (hex)
    fontFamily: string; // Font family (import separately)
}

export interface ToggleButtonOptions {
    icon: string; // SVG icon string
    icon_size: string; // Icon size (CSS units)
    btn_size: string; // Button size (CSS units)
}

export interface ChatOptions {
    title: string; // Title of the chat window
    apiKey: string; // API key for the Argonaut API
    apiEndpoint: string; // API endpoint for the Argonaut API
    greeting: string; // Greeting message displayed when opened
    position: 'bottom-right' | 'bottom-left'; // Chat position
    placeholder: string; // Input field placeholder
    theme: ThemeOptions; // Theme configuration
    user_icon?: string; // User message icon (optional)
    assistant_icon?: string; // Assistant message icon (optional)
    toggleButton: ToggleButtonOptions; // Toggle button configuration
}
