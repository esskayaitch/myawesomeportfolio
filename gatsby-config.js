require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby WordPress Starter`,
    description: `Kick off your next, great Gatsby project with this WordPress starter.`,
    author: `@tomphill`,
    // pathPrefix: `/myawesomeportfolio`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
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
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url:
          process.env.WPGRAPHQL_URL || `http://gatsby-wordpress-course/graphql`, // for XAMPP
        // `https://http://gatsby-wordpress-course.local/graphql`, // for Local/Flywheel
        schema: {
          perPage: 100,
        },
        verbose: false,
      },
    },
  ],
}
