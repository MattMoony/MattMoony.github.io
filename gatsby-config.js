const path = require(`path`);

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: path.join(__dirname, `src`, `blog`),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MattMoony.github.io`,
        short_name: `MattMoony`,
        start_url: `/`,
        icon: `src/images/goose.png`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: `Abyss`,
            },
          },
          `gatsby-remark-images`,
          `gatsby-remark-autolink-headers`,
        ],
      },
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
  ],
};
