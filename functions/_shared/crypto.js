export function randomBytes(length = 32) {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return bytes;
}

export function randomToken(length = 32) {
    return base64url(randomBytes(length));
}

export function base64url(bytes) {
    let binary = "";

    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }

    return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
}

export function utf8Bytes(value) {
    return new TextEncoder().encode(value);
}

export async function sha256(value) {
    const bytes =
        typeof value === "string"
            ? utf8Bytes(value)
            : value;

    return new Uint8Array(
        await crypto.subtle.digest("SHA-256", bytes)
    );
}

export async function sha256Base64url(value) {
    return base64url(await sha256(value));
}

export async function createPkce() {
    const codeVerifier = randomToken(32);

    const codeChallenge =
        await sha256Base64url(codeVerifier);

    return {
        codeVerifier,
        codeChallenge
    };
}

export function nowSeconds() {
    return Math.floor(Date.now() / 1000);
}
