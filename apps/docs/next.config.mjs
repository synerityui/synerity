/** @type {import('next').NextConfig} */
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(isGitHubActions && {
    basePath: "/synerity",
    assetPrefix: "/synerity",
  }),
};

export default nextConfig;
