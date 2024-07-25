/** @type {import('next').NextConfig} */
const nextConfig = {
   typescript: {
      ignoreBuildErrors: true,
   },
   eslint: {
      ignoreDuringBuilds: true,
   },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
   enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
   webpack(config, { dev, isServer }) {
      // Your existing webpack configuration
      return config;
   },
});

const WebpackDllBundlesPlugin = require("webpack-dll-bundles-plugin");

module.exports = {
   webpack(config, { dev, isServer }) {
      if (!dev) {
         config.plugins.push(
            new WebpackDllBundlesPlugin({
               filename: "vendor.js",
               path: path.join(__dirname, "static/dll"),
               entry: {
                  vendor: ["react", "react-dom"],
               },
            })
         );
      }
      return config;
   },
};

export default nextConfig;
