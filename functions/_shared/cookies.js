export function getCookie(request, name) {
    const cookieHeader = request.headers.get("Cookie");

    if (!cookieHeader) {
        return null;
    }

    const cookies = cookieHeader.split(";");

    for (const item of cookies) {
        const index = item.indexOf("=");

        if (index === -1) {
            continue;
        }

        const key = item.slice(0, index).trim();
        const value = item.slice(index + 1).trim();

        if (key === name) {
            return decodeURIComponent(value);
        }
    }

    return null;
}

export function setCookie(
    name,
    value,
    {
        maxAge,
        sameSite = "Lax"
    } = {}
) {
    const parts = [
        `${name}=${encodeURIComponent(value)}`,
        "Path=/",
        "Secure",
        "HttpOnly",
        `SameSite=${sameSite}`
    ];

    if (typeof maxAge === "number") {
        parts.push(`Max-Age=${maxAge}`);
    }

    return parts.join("; ");
}

export function deleteCookie(
    name,
    sameSite = "Strict"
) {
    return [
        `${name}=`,
        "Path=/",
        "Secure",
        "HttpOnly",
        `SameSite=${sameSite}`,
        "Max-Age=0"
    ].join("; ");
}
