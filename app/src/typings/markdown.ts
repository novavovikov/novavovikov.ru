import { FluidObject } from 'gatsby-image'

interface ChildImageSharp {
  fluid: FluidObject
}

export interface ArticleMeta {
  cover?: {
    childImageSharp: ChildImageSharp
  }
  title: string
  date: string
  description: string
  tags?: string[]
}

export interface ArticleInfo {
  timeToRead: number
  frontmatter: ArticleMeta
  html?: string
  fields: {
    slug: string
  }
}

export interface ArticleType {
  id: string
  fields: {
    slug: string
  }
  timeToRead: number
  frontmatter: ArticleMeta
}

export interface MarkdownEdge {
  node: ArticleType
}

export interface SocialData {
  twitter: string
  github: string
  email: string
  telegram: string
}

export interface SiteMetadata {
  siteUrl: string
  author: string
  title: string
  description: string
  social: SocialData
}

export interface Site {
  siteMetadata: SiteMetadata
}

export interface AllMarkdownRemark {
  edges: MarkdownEdge[]
}
