const path = require(`path`);

module.exports = {
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'GraphCMS',
        fieldName: 'graphcms',
        url: process.env.GRAPHCMS_ENDPOINT,
        headers: {
          Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: path.join(__dirname, `src`, `assets`),
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Konferencja Bezpieczeństwa Narodowego`,
        short_name: `KBN`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: `src/assets/favicon-KBN.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-htaccess',
      options: {
        RewriteBase: '/custom/',
        https: true,
        www: false,
        SymLinksIfOwnerMatch: true,
        host: 'konferencjabezpieczenstwanarodowego.swbn.pl', // if 'www' is set to 'false', be sure to also remove it here!
        // ErrorDocument: `
        //   ErrorDocument 401 /error_pages/401.html
        //   ErrorDocument 404 /error_pages/404.html
        //   ErrorDocument 500 /error_pages/500.html
        // `,
        redirect: [
          'RewriteRule ^not-existing-url/?$ /existing-url [R=301,L,NE]',
          {
            // from: 'my-domain.com',
            // to: 'mydomain.com',
          },
          {
            // from: 'my-other-domain.com',
            // to: 'mydomain.com',
          },
        ],
        custom: `
            # This is a custom rule!
            # This is a another custom rule!
        `,
      },
    },
  ],
};
