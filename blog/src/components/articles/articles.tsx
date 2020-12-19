import React from 'react'
import { ArticleType, MarkdownEdge } from '../../typings/markdown'
import EmptyState from './empty-state'
import SimpleCard from './simple-card'
import VerticalCard from './vertical-card'
import s from './articles.module.css'
import HeroCard from './hero-card'

export interface ArticleProps {
  data: ArticleType
}

interface Props {
  hasSearchMode: boolean
  articles: MarkdownEdge[]
}

function renderCard(hasSearchMode: boolean, ndx: number) {
  if (hasSearchMode || (ndx !== 0 && ndx % 3 === 0)) {
    return SimpleCard
  }

  if (ndx % 4 === 0) {
    return HeroCard
  }

  return VerticalCard
}

export default function Articles({ hasSearchMode, articles }: Props) {
  if (!articles.length) {
    return <EmptyState />
  }

  return (
    <div className={s.Articles}>
      {articles.map(({ node }) => (
        <SimpleCard key={node.id} data={node} />
      ))}
    </div>
  )
}
