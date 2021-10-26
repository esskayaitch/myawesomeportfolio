27 October 2021

## This is the outcome of completing the Udemy course:

> "Gatsby JS: Build Gatsby static sites with React & WordPress"
>
> by _Tom Phillips_.

This course was written in 2019 and since then there have been many updates to the Gatsby ecosystem and plug-ins.

This version does not use the wp REST API. Instead I have used the current plugins:

- WP Gatsby
- WP Graphql ( with necessary query syntax changes)
- WPGrahql for Advanced Custom Fields

I have also updated the package.json file to use:

- gatsby-plugin-image (instead of gatsby-image),
- gatsby-plugin-sharp,
- gatsby-transformer-sharp,
  although I admit I still have a warning about using 'fluid' and I would welcome any help there.

The updates to Gatsby and Gatsby-source-wordpress have also simplified the routing - although again I have a warning about the precedence of "/" matching "/page" so please feel free to modify that too.

I hope it stays current long enough to assist someone.

**And Tom, if you're out there, thanks for the course.**

Cheers
Simon.
