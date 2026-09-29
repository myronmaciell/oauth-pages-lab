export function getProviderConfig(provider, env) {
    const baseUrl = env.PUBLIC_BASE_URL;

    if (!baseUrl) {
        throw new Error("PUBLIC_BASE_URL não configurada");
    }

    if (provider === "google") {
        return {
            name: "google",

            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,

            authorizationEndpoint:
                "https://accounts.google.com/o/oauth2/v2/auth",

            tokenEndpoint:
                "https://oauth2.googleapis.com/token",

            redirectUri:
                `${baseUrl}/oauth/callback/google`
        };
    }

    if (provider === "github") {
        return {
            name: "github",

            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,

            authorizationEndpoint:
                "https://github.com/login/oauth/authorize",

            tokenEndpoint:
                "https://github.com/login/oauth/access_token",

            redirectUri:
                `${baseUrl}/oauth/callback/github`
        };
    }

    throw new Error("Provider inválido");
}
