const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
const { pseudoRandomBytes } = require("crypto")

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.

// Will create pages for WordPress pages (route : /{slug})       <<<<<<<<<<<<<<
// Will create pages for WordPress posts (route : /post/{slug})  <<<<<<<<<<<<<<<<
exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  createRedirect({
    fromPath: "/",
    toPath: "/home", // <<< set default home page slug ??? skh <<<<<<<<<<<<<<<<<<<<<<<<<<<
    redirectInBrowser: true,
    isPermanent: true,
  })
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local WordPress graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.

    // ==== PAGES (WORDPRESS NATIVE) ====
    graphql(
      `
        {
          allWpPage {
            edges {
              node {
                id
                slug
                status
                template {
                  templateName
                }
                title
                content
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create Page pages.
        const pageTemplate = path.resolve("./src/templates/page.js")
        const portfolioUnderContentTemplate = path.resolve(
          "./src/templates/portfolioUnderContent.js"
        )
        // We want to create a detailed page for each
        // page node. We'll just use the WordPress Slug for the slug.
        // The Page ID is prefixed with 'PAGE_'
        _.each(result.data.allWpPage.edges, edge => {
          // Gatsby uses Redux to manage its internal state.       <<<<<<<<<<<<<<<<<<<<<<<<<<<
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.

          // console.log("--------------------------------------------")
          // console.log(edge.node.title, edge.node.template)
          // console.log("--------------------------------------------")

          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/${edge.node.slug}/`,
            component: slash(
              edge.node.template.templateName ===
                "Portfolio Items Below Content"
                ? portfolioUnderContentTemplate
                : pageTemplate
            ),
            context: edge.node,
          })
        })
      })
      // ==== END PAGES ====

      // ==== PROJECTS  ====
      .then(() => {
        graphql(
          `
            {
              allWpProject {
                edges {
                  node {
                    id
                    title
                    content
                    excerpt
                    slug
                    featuredImage {
                      node {
                        sourceUrl
                      }
                    }
                    projectsACF {
                      projectUrl
                    }
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
          const projectTemplate = path.resolve("./src/templates/project.js")
          // We want to create a detailed page for each
          // post node. We'll just use the WordPress Slug for the slug.
          // The Post ID is prefixed with 'POST_'
          _.each(result.data.allWpProject.edges, edge => {
            // console.log("--------------------------------------------")
            // console.log(edge.node.projectsACF.projectUrl, edge.node.template)
            // console.log("--------------------------------------------")

            createPage({
              path: `/project/${edge.node.slug}/`,
              component: slash(projectTemplate),
              context: edge.node,
            })
          })
          // resolve() // <-- put after last query, see below...
        })
      })
      // ==== END PROJECTS ====

      // BLOG POSTS
      .then(() => {
        graphql(`
          {
            allWpPost(sort: { order: DESC, fields: date }) {
              edges {
                node {
                  title
                  content
                  excerpt
                  date(formatString: "Do MMM YYYY hh:mma")
                  databaseId
                  slug
                }
              }
            }
          }
        `).then(result => {
          if (result.errors) {
            console.log(result.errors)
            reject(result.errors)
          }
          // variables for pagination calcs
          const posts = result.data.allWpPost.edges
          const postsPerPage = 3
          const numberOfPages = Math.ceil(posts.length / postsPerPage)
          const blogPostListTemplate = path.resolve(
            "./src/templates/blogPostList.js"
          )

          Array.from({ length: numberOfPages }).forEach((page, index) => {
            createPage({
              component: slash(blogPostListTemplate),
              path: index === 0 ? "/blog" : `/blog/${index + 1}`,
              context: {
                posts: posts.slice(
                  index * postsPerPage,
                  index * postsPerPage + postsPerPage
                ),
                numberOfPages,
                currentPage: index + 1,
              },
            })
          })

          const pageTemplate = path.resolve("./src/templates/page.js")
          _.each(posts, post => {
            createPage({
              path: `/post/${post.node.slug}`,
              component: slash(pageTemplate),
              context: post.node,
            })
          })

          resolve()
        })
      })
  })
}
