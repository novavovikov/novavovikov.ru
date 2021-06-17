import React from 'react'
import { Disqus } from 'gatsby-plugin-disqus'
import { graphql, PageProps } from 'gatsby'
import formatISO from 'date-fns/formatISO'
import { PostData, PostPageContext } from '../../typings/post'
import Page from '../../ui/page'
import Post from '../../components/post'
import { getPostImageUrl } from './utils'
import PostPreview from '../../components/post-preview'
import { LINKS } from '../../constants/links'
import * as s from './post.module.css'

export default function PostPage(props: PageProps<PostData, PostPageContext>) {
  const { location, pageContext, data } = props
  const { slug, prev, prevImageFileId, next, nextImageFileId } = pageContext

  const { markdownRemark, allFile, site } = data
  const { title, description, cover } = markdownRemark.frontmatter

  const prevPostImage = getPostImageUrl(allFile.nodes, prevImageFileId)
  const nextPostImage = getPostImageUrl(allFile.nodes, nextImageFileId)

  const disqusConfig = {
    url: `${site.siteMetadata.siteUrl + location.pathname}`,
    identifier: markdownRemark.id,
    title
  }

  return (
    <Page
      seoProps={{
        title,
        description,
        image: cover?.childImageSharp.gatsbyImageData,
        meta: [
          {
            property: 'article:published_time',
            content: formatISO(new Date(markdownRemark.frontmatter.date), {
              representation: 'date'
            })
          },
          {
            property: 'article:modified_time',
            content: formatISO(new Date(markdownRemark.parent.modifiedTime), {
              representation: 'date'
            })
          },
          {
            property: 'article:author',
            content: site.siteMetadata.social.twitter
          },
          {
            property: 'article:section',
            content: 'Technology'
          },
          {
            property: 'article:tag',
            content: markdownRemark.frontmatter.tags?.join(',') || ''
          }
        ]
      }}>
      <Post
        postLink={props.location.href}
        githubLink={`${LINKS.blog}${slug}`}
        article={markdownRemark}
      />

      <div className={s.PostPreview}>
        <h3 className={s.PostPreview__title}>Читать ещё:</h3>

        <div className={s.PostPreview__content}>
          <div className={s.PostPreview__item}>
            {prev && <PostPreview {...prev} imageUrl={prevPostImage} />}
          </div>
          <div className={s.PostPreview__item}>
            {next && <PostPreview inverse {...next} imageUrl={nextPostImage} />}
          </div>
        </div>
      </div>

      <div className={s.PostPreview}>
        <Disqus config={disqusConfig} />
      </div>
    </Page>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String
    $prevImageFileId: String
    $nextImageFileId: String
  ) {
    site {
      siteMetadata {
        siteUrl
        social {
          twitter
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        date
        title
        description
        tags
        cover {
          id
          childImageSharp {
            gatsbyImageData(layout: FIXED)
          }
        }
      }
      parent {
        ... on File {
          modifiedTime
        }
      }
    }
    allFile(filter: { id: { in: [$prevImageFileId, $nextImageFileId] } }) {
      nodes {
        id
        childImageSharp {
          gatsbyImageData(width: 200)
        }
      }
    }
  }
`
