const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");
const withCss = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const withFonts = require("next-fonts");

module.exports = withFonts(
  withCss(
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
  )
);

// const { parsed: localEnv } = require("dotenv").config();
// const webpack = require("webpack");
// const compose = require("next-compose-plugins");
// const css = require("@zeit/next-css");
// const sass = require("@zeit/next-sass");
// const fonts = require("next-fonts");

// module.exports = compose([css, sass, fonts], {
//   exportTrailingSlash: true,
//   webpack(config) {
//     config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

//     return config;
//   },
//   // exportPathMap: function () {
//   //   return {
//   //     "/": { page: "/" },
//   //     "/categories": { page: "/categories" },
//   //     "/products": { page: "/products" },
//   //     "/products/[id]": { page: "/products/[id]" },
//   //   };
//   // },
// });
