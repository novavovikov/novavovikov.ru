const ghServerUrl = process.env.GATSBY_GITHUB_SERVER_URL ?? 'https://github.com'
const ghRepository = process.env.GATSBY_GITHUB_REPOSITORY ?? 'novavovikov/novavovikov.ru'
const articles = `${ghServerUrl}/${ghRepository}/tree/master/app/articles`

export const LINKS = {
  ghServerUrl,
  ghRepository,
  articles
}
