import { MarkdownEdge } from '../typings/markdown'

interface Filters {
  tag?: string
  title?: string
}

export const filterArticles = (
  articles: MarkdownEdge[],
  { tag, title }: Filters
) => {
  if (title) {
    const normalizedTitle = title.toLowerCase()
    return articles.filter(({ node }) =>
      node.frontmatter.title.toLowerCase().includes(normalizedTitle)
    )
  }

  if (tag) {
    return articles.filter(({ node }) => node.frontmatter.tags?.includes(tag))
  }

  return articles
}
