import React from 'react'
import { Helmet, HelmetProps } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        author
        title
        description
        siteUrl
        social {
          twitter
        }
      }
    }
  }
`

export interface Props {
  meta?: HelmetProps['meta']
  image?: string
  title?: string
  description?: string
  slug?: string
  lang?: string
}

export default function SEO({
  meta = [],
  image,
  title,
  description,
  slug = '',
  lang = 'ru'
}: Props) {
  const { siteMetadata } = useStaticQuery(query).site

  const metaUrl = `${siteMetadata.siteUrl}${slug}`
  const metaTitle = title || siteMetadata.title
  const metaDescription = description || siteMetadata.description
  const metaImage = image ? `${siteMetadata.siteUrl}/${image}` : null

  const metaTitleProps = React.useMemo(() => {
    if (title) {
      return {
        titleTemplate: `%s — ${siteMetadata.title.toLowerCase()} - 🧑‍💻 Developer articles`,
        title
      }
    }

    return { title: `🧑‍💻 Developer articles - ${siteMetadata.title}` }
  }, [title, siteMetadata.title])

  const mediaMeta = React.useMemo(() => {
    if (metaImage) {
      return [
        { itemprop: 'image', content: metaImage },
        { property: 'og:image', content: metaImage },
        { name: 'twitter:image', content: metaImage }
      ]
    }

    return []
  }, [metaImage])

  const defaultMeta = [
    { name: 'description', content: metaDescription },
    { name: 'author', content: siteMetadata.author },

    // Schema.org markup for Google+
    { itemprop: 'name', content: siteMetadata.author },
    { itemprop: 'description', content: metaDescription },

    // Twitter Card data
    { name: 'twitter:creator', content: siteMetadata.author },
    { name: 'twitter:card', content: 'product' },
    { name: 'twitter:site', content: metaUrl },
    { name: 'twitter:title', content: metaTitle },
    { name: 'twitter:description', content: metaDescription },

    // Open Graph data
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: metaUrl },
    { property: 'og:title', content: metaTitle },
    { property: 'og:description', content: metaDescription },

    // Application params
    { name: 'msapplication-tooltip', content: metaTitle },
    { name: 'msapplication-starturl', content: `${metaUrl}?pinned=true` },
    { name: 'msapplication-tap-highlight', content: 'no' },
    { name: 'mobile-web-app-capable', content: 'yes' },
    { name: 'application-name', content: siteMetadata.author },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent'
    },
    { name: 'apple-mobile-web-app-title', content: metaTitle },
    { name: 'msapplication-TileColor', content: '#0366d6' },
    { name: 'theme-color', content: '#0366d6' }
  ]

  return (
    <Helmet
      htmlAttributes={{ lang }}
      {...metaTitleProps}
      meta={[...defaultMeta, ...mediaMeta, ...meta]}
    />
  )
}
