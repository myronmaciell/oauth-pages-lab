export function validateIssuer(
    issuer,
    expectedIssuer
) {
    return issuer === expectedIssuer;
}

export function validateAudience(
    audience,
    clientId
) {
    if (Array.isArray(audience)) {
        return audience.includes(clientId);
    }

    return audience === clientId;
}

export function validateExpiration(exp) {
    const now = Math.floor(Date.now() / 1000);

    return Number.isFinite(exp) && exp > now;
}

export function validateIssuedAt(iat) {
    const now = Math.floor(Date.now() / 1000);

    return Number.isFinite(iat) && iat <= now + 60;
}
