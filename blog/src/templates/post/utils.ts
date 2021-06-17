import { PostImageFile } from '../../typings/post'
import { getSrc } from 'gatsby-plugin-image'

export const getPostImageUrl = (
  files: PostImageFile[],
  fileId?: string
): Nulled<string> => {
  if (!fileId) {
    return null
  }

  const file = files.find(({ id }) => id === fileId)

  if (file) {
    return getSrc(file.childImageSharp.gatsbyImageData) ?? null
  }

  return null
}
