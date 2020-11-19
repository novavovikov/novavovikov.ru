const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { getFrontendEvents } = require(`./modules/events/frontend-events`)
const { getKotlinEvents } = require(`./modules/events/kotlin-events`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { type: { ne: "DRAFT" } } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              tags
              cover {
                id
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    console.error(result.errors)
    return
  }

  const posts = result.data.allMarkdownRemark.edges
  const postsLastNdx = posts.length - 1

  // Frontend events
  const frontendEvents = await getFrontendEvents()
  createPage({
    path: 'events/frontend',
    component: path.resolve(`src/templates/events/events.tsx`),
    context: {
      name: 'Frontend',
      events: frontendEvents
    }
  })

  // Kotlin events
  const kotlinEvents = await getKotlinEvents()
  createPage({
    path: 'events/kotlin',
    component: path.resolve(`src/templates/events/events.tsx`),
    context: {
      name: 'Kotlin',
      events: kotlinEvents
    }
  })

  // Main page
  const allTags = posts.reduce((res, { node }) => {
    if (node.frontmatter.tags) {
      for (const tag of node.frontmatter.tags) {
        res.add(tag)
      }
    }

    return res
  }, new Set())

  createPage({
    path: '/',
    component: path.resolve('./src/templates/main/main.tsx'),
    context: {
      tags: Array.from(allTags),

      lastEvent: frontendEvents[0] ?? kotlinEvents[0] ?? null,
      frontendEventsCount: frontendEvents.length,
      kotlinEventsCount: kotlinEvents.length
    }
  })

  // Post page
  posts.forEach((post, ndx) => {
    const { slug } = post.node.fields
    const prevPost =
      ndx === postsLastNdx && posts.length > 2 ? posts[0] : posts[ndx + 1]
    const prev = prevPost && {
      path: prevPost.node.fields.slug,
      title: prevPost.node.frontmatter.title
    }

    const nextPost =
      ndx === 0 && posts.length > 2 ? posts[postsLastNdx] : posts[ndx - 1]
    const next = nextPost && {
      path: nextPost.node.fields.slug,
      title: nextPost.node.frontmatter.title
    }

    createPage({
      path: slug,
      component: path.resolve(`src/templates/post/post.tsx`),
      context: {
        slug,

        prev,
        prevImageFileId: prevPost?.node.frontmatter.cover?.id,

        next,
        nextImageFileId: nextPost?.node.frontmatter.cover?.id
      }
    })
  })
}

exports.onCreateNode = ({ node, actions: { createNodeField }, getNode }) => {
  if (node.internal.type !== `MarkdownRemark`) {
    return
  }

  const slug = createFilePath({ node, getNode })

  createNodeField({
    node,
    name: `slug`,
    value: `/articles${slug}`
  })
}
