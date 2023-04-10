const withSvgr = require("next-plugin-svgr");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  svgrOptions: {
    svgoConfig: {
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              removeViewBox: false,
            },
          },
        },
      ],
    },
  },
  async redirects() {
    return [
      {
        source: "/request",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = withSvgr(nextConfig);
