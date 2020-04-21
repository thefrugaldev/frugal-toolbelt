const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");
const compose = require("next-compose-plugins");
const css = require("@zeit/next-css");
const sass = require("@zeit/next-sass");
const fonts = require("next-fonts");

module.exports = compose([css, sass, fonts], {
  exportTrailingSlash: false,
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config;
  },
});
