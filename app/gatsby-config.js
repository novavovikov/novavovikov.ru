const yandexMusicTransformer = require('./src/utils/yandex-music-transformer')
const { createProxyMiddleware } = require('http-proxy-middleware')

const env =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

module.exports = {
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-164641660-1`
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `NovaVovikov Blog`,
        short_name: `NovaVovikov`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#0366d6`,
        display: `minimal-ui`,
        icon: `static/logo.png`,
        theme_color_in_head: false
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
    `gatsby-plugin-css-modules-typings`,
    'gatsby-plugin-sharp',
    `gatsby-transformer-sharp`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-use-query-params',
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-feed`
  ]
}
