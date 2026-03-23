const fallbackSecret = "local-dev-nextauth-secret-change-in-production";

export const authSecret =
  process.env.NEXTAUTH_SECRET ||
  process.env.AUTH_SECRET ||
  fallbackSecret;
