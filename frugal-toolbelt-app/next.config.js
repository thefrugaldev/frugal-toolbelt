const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");
const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");

module.exports = withCss(
  withSass({
    exportTrailingSlash: true,
    webpack(config, options) {
      config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
          },
        },
      });

      return config;
    },
  })
);
