module.exports = {
  siteMetadata: {
    title: `Zag's Boons`,
    description: `Hades Boon Website`,
    author: `Wesley Kok`,
    menuLinks: [
      {
        name: "Aphrodite",
        link: "/aphrodite",
      },
      {
        name: "Ares",
        link: "/ares",
      },
      {
        name: "Artemis",
        link: "/artemis",
      },
      {
        name: "Athena",
        link: "/athena",
      },
      {
        name: "Demeter",
        link: "/demeter",
      },
      {
        name: "Dionysus",
        link: "/dionysus",
      },
      {
        name: "Poseidon",
        link: "/poseidon",
      },
      {
        name: "Zeus",
        link: "/zeus",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/Daedalus_Hammer.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts-v2`,
      options: {
        fonts: [
          {
            family: `Belleza`,
          },
        ],
      },
    },
  ],
}
