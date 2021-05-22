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
        name: `projects`,
        path: path.join(__dirname, `src`, `blog`, `projects`),
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
    `gatsby-plugin-typescript`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-react-helmet`,
  ],
};
