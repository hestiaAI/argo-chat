import {
    ChatConfig,
    ChatOptions,
    ThemeOptions,
    ToggleButtonOptions,
} from '../types/options';

export function mergeConfig(
    defaults: ChatOptions,
    overrides: Partial<ChatConfig>,
): ChatOptions {
    const result = { ...defaults };

    for (const key of Object.keys(overrides) as (keyof ChatConfig)[]) {
        const value = overrides[key];
        if (key === 'theme' && value && typeof value === 'object') {
            result.theme = {
                ...result.theme,
                ...(value as Partial<ThemeOptions>),
            };
        } else if (
            key === 'toggleButton' &&
            value &&
            typeof value === 'object'
        ) {
            result.toggleButton = {
                ...result.toggleButton,
                ...(value as Partial<ToggleButtonOptions>),
            };
        } else if (value !== undefined) {
            result[key] = value as any;
        }
    }

    return result;
}
