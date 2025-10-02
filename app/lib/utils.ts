/**
 * Utility functions for the AI Resume Analyser project.
 * 
 * formatSize(bytes: number): string
 *   - Converts a size in bytes to a human-readable string (B, KB, MB, GB).
 *   - Example: formatSize(2048) => "2 KB"
 *   - If the result has only zeroes after the decimal, returns as integer.
 */

export function formatSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let i = 0;
    let size = bytes;
    while (size >= 1024 && i < units.length - 1) {
        size /= 1024;
        i++;
    }
    const formatted = size % 1 === 0 ? size.toString() : size.toFixed(2);
    return `${formatted} ${units[i]}`;
}

export const generateUUID = () => crypto.randomUUID();