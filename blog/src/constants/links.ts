const ghServerUrl = process.env.GATSBY_GITHUB_SERVER_URL ?? 'https://github.com'
const ghRepository =
  process.env.GATSBY_GITHUB_REPOSITORY ?? 'novavovikov/novavovikov.ru'
const blog = `${ghServerUrl}/${ghRepository}/tree/master/blog`

export const LINKS = {
  ghServerUrl,
  ghRepository,
  blog
}
