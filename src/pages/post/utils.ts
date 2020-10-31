import { PostImageFile } from '../../typings/post'

export const getPostImageUrl = (
  files: PostImageFile[],
  fileId?: string
): Nulled<string> => {
  if (fileId) {
    const file = files.find(({ id }) => id === fileId)
    return file?.childImageSharp.fluid?.src || null
  }

  return null
}
