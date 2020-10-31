const yandexMusicTransformer = require('./src/utils/yandex-mudic-transformer')

module.exports = {
  siteMetadata: {
    title: 'NovaVovikov.ru',
    author: 'novavovikov',
    description: 'My personal blog',
    siteUrl: 'https://novavovikov.ru',
    social: {
      twitter: 'https://twitter.com/novavovikov',
      github: 'https://github.com/novavovikov',
      telegram: 'https://t.me/NovaVovikov',
      email: 'mailto:novavovikov@gmail.com'
    }
  },
  pathPrefix: '/',
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
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 760
            }
          },
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-164641660-1`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `NovaVovikov Blog`,
        short_name: `NovaVovikov`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#0366d6`,
        display: `minimal-ui`,
        icon: `static/logo.png`,
        theme_color_in_head: false,
        orientation: 'portrait-primary'
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: '[local]--[hash:base64:3]'
          }
        }
      }
    },
    `gatsby-plugin-css-modules-typings`,
    `gatsby-transformer-sharp`,
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-use-query-params'
  ]
}
