import React from 'react'
import Helmet, { HelmetProps } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import { useThemeContext } from '../../providers/theme'

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
  const { theme } = useThemeContext()

  const url = `${siteMetadata.siteUrl}${slug}`
  const metaDescription = description || siteMetadata.description
  const metaImage = image ? `${siteMetadata.siteUrl}/${image}` : null

  const metaTitle = React.useMemo(() => {
    if (title) {
      return {
        titleTemplate: `%s — ${siteMetadata.title.toLowerCase()} — A blog by Vladimir Novikov 🌈`,
        title
      }
    }

    return { title: `${siteMetadata.title} — A blog by Vladimir Novikov 🌈` }
  }, [title, siteMetadata.title])

  const defaultMeta = [
    { name: 'description', content: metaDescription },
    { property: 'og:url', content: url },
    { property: 'og:title', content: title || siteMetadata.title },
    { property: 'og:description', content: metaDescription },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: siteMetadata.social.twitter },
    { name: 'twitter:title', content: title || siteMetadata.title },
    { name: 'twitter:description', content: metaDescription }
  ]

  const mediaMeta = React.useMemo(() => {
    if (metaImage) {
      return [
        { property: 'og:image', content: metaImage },
        { name: 'twitter:image', content: metaImage }
      ]
    }

    return []
  }, [metaImage])

  return (
    <Helmet
      htmlAttributes={{ lang, ['data-theme']: theme }}
      {...metaTitle}
      meta={[...defaultMeta, ...mediaMeta, ...meta]}
    />
  )
}
