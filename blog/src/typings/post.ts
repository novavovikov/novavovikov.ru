import { ArticleInfo, ChildImageSharp } from './markdown'
import { PostPreviewData } from './post-preview'

export interface PostImageFile {
  id: string
  childImageSharp: ChildImageSharp
}

export interface PostData {
  site: {
    siteMetadata: {
      siteUrl: string
      social: {
        twitter: string
      }
    }
  }
  markdownRemark: ArticleInfo
  allFile: {
    nodes: PostImageFile[]
  }
}

export interface PostPageContext {
  slug: string
  tags: string[]
  next: Nulled<PostPreviewData>
  prev: Nulled<PostPreviewData>
  prevImageFileId?: string
  nextImageFileId?: string
}
