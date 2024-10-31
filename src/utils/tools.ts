// Convert a size string to a pixel string if not already specified
// Examples:
// convertToPx('50') => '50px'
// convertToPx('50px') => '50px'
// convertToPx('50rem') => '50rem'
export function convertToPx(size: string): string {
    return isNaN(+size) ? size : `${size}px`;
}
