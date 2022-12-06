export function finStartOfPacket(input: string, markerLength = 4): number | null {
    for (let i = 0; i < input.length; i++) {
        const potentialMarker = new Set(input.substring(i, i + markerLength));
        if (potentialMarker.size === markerLength) {
            return i + markerLength;
        }
    }
    return null
}