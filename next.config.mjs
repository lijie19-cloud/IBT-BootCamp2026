/** @type {import('next').NextConfig} */
const isDevelopment = process.env.NODE_ENV === "development";
const scriptSources = ["'self'", "'unsafe-inline'"];

// Next.js Fast Refresh compiles modules with eval in development. Keep that
// exception local-only so production retains the stricter script policy.
if (isDevelopment) scriptSources.push("'unsafe-eval'");

const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  experimental: {
    cpus: 1,
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "Content-Security-Policy", value: `default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; img-src 'self' data: https:; font-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src ${scriptSources.join(" ")}; connect-src 'self'; upgrade-insecure-requests` },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
      ],
    }];
  },
};

export default nextConfig;
