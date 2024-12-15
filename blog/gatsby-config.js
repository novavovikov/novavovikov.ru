const yandexMusicTransformer = require('./src/utils/yandex-music-transformer')
const { createProxyMiddleware } = require('http-proxy-middleware')

const env =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

module.exports = {
  pathPrefix: '/',
  developMiddleware: (app) => {
    app.use(
      '/feedback',
      createProxyMiddleware({
        target: 'http://localhost:3000',
        secure: false // Do not reject self-signed certificates.
      })
    )
  },
  siteMetadata: {
    title: 'novavovikov.ru',
    author: 'novavovikov',
    description: 'Articles for developers',
    siteUrl: 'https://novavovikov.ru',
    social: {
      twitter: 'https://twitter.com/novavovikov',
      github: 'https://github.com/novavovikov',
      telegram: 'https://t.me/NovaVovikov',
      email: 'mailto:novavovikov@gmail.com'
    }
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true, // defaults to false
        jsxPragma: `jsx`, // defaults to "React"
        allExtensions: true // defaults to false
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'articles',
        path: `${__dirname}/articles`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'assets',
        path: `${__dirname}/src/assets`
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/,
          resourceQuery: /inline/
        }
      }
    },
    {
      resolve: 'gatsby-plugin-use-dark-mode',
      options: {
        classNameDark: 'dark-mode',
        classNameLight: 'light-mode',
        storageKey: 'darkMode',
        minify: true
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-embedder`,
            options: {
              customTransformers: [
                // Your custom transformers
                yandexMusicTransformer
              ],
              services: {
                // The service-specific options by the name of the service
              }
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 760
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '÷'
            }
          },
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank'
            }
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-yandex-metrika`,
      options: {
        trackingId: '41516474',
        webvisor: true,
        trackHash: true,
        afterBody: true,
        defer: false
      }
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                const siteUrl = site.siteMetadata.siteUrl
                const postText = `
                <div style="margin-top=55px; font-style: italic;">(Статья опубликована на моём сайте novavovikov.ru. <a href="${
                  siteUrl + edge.node.fields.slug
                }">Перейти</a>.)</div>
              `

                let html = edge.node.html
                html = html
                  .replace(/href="\//g, `href="${siteUrl}/`)
                  .replace(/src="\//g, `src="${siteUrl}/`)
                  .replace(/"\/static\//g, `"${siteUrl}/static/`)
                  .replace(/,\s*\/static\//g, `,${siteUrl}/static/`)

                return Object.assign({}, edge.node.frontmatter, {
                  title: site.siteMetadata.title,
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': html + postText }]
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  filter: { fileAbsolutePath: { regex: "/^((?!DRAFT).)*$/" } }
                  sort: { fields: [frontmatter___date], order: DESC }
                  limit: 1000
                ) {
                  edges {
                    node {
                      excerpt(pruneLength: 250)
                      html
                      fields { 
                        slug   
                      }
                      frontmatter {
                        title
                        date
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'novavovikov RSS Feed'
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `novavovikov`,
        short_name: `novavovikov`,
        description: 'Articles for developers',
        icons: [
          {
            src: '/icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        theme_color: `#e6e6e6`,
        background_color: `#e6e6e6`,
        start_url: `/`,
        display: `standalone`
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        cssLoaderOptions: {
          localIdentName:
            env === 'development'
              ? '[local]--[hash:base64:3]'
              : '[hash:base64:7]'
        }
      }
    },
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    `gatsby-transformer-sharp`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-use-query-params',
    `gatsby-plugin-sitemap`
  ]
}
