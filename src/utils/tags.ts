export const getTagsFromKeywords = (keywords?: string): string[] => {
  if (keywords) {
    return keywords.split(',').map((w) => w.trim())
  }

  return []
}
