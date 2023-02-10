const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");


dotenvLoad();

const withNextEnv = nextEnv();

module.exports = withNextEnv({
  distDir: "build",
  webpack: (config, options) => {
    config.module.rules.push({ parser: { amd: false } });
    return config;
  },
});
