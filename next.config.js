/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath:
    process.env.NODE_ENV === "production" ? "/rational_design_webapp" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/rational_design_webapp/" : "",
};

module.exports = nextConfig;
