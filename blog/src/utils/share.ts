/** List of social systems */
export enum SocialSystem {
  facebook = 'facebook',
  twitter = 'twitter',
  linkedIn = 'linkedin',
  reddit = 'reddit',
  vk = 'vk',
  telegram = 'telegram'
}

/** Common ShareParams */
export interface ShareParams {
  /** Url your page */
  url: string
  /** Title */
  title: string
  /** Description about page */
  description: string
  /** Page images */
  image?: Nulled<string>
  /** Name of users (used in twitter only)*/
  via?: string
  /** Tags */
  hashTags?: string[]
}

export class Share {
  constructor(private readonly params: ShareParams) {}

  static sitesLinks = {
    [SocialSystem.facebook]: 'https://www.facebook.com/sharer/sharer.php',
    [SocialSystem.twitter]: 'https://twitter.com/share',
    [SocialSystem.linkedIn]: 'https://linkedin.com/shareArticle',
    [SocialSystem.reddit]: 'https://www.reddit.com/submit',
    [SocialSystem.vk]: 'https://vk.com/share.php',
    [SocialSystem.telegram]: 'https://telegram.me/share'
  }

  static queryKeys = {
    [SocialSystem.facebook]: {
      u: 'url',
      quote: 'title',
      hashTag: 'hashTags'
    },
    [SocialSystem.twitter]: {
      url: 'url',
      text: 'title',
      via: 'via',
      hashtags: 'hashTags'
    },
    [SocialSystem.linkedIn]: {
      url: 'url'
    },
    [SocialSystem.reddit]: {
      url: 'url',
      title: 'title'
    },
    [SocialSystem.vk]: {
      url: 'url',
      title: 'title',
      description: 'description',
      image: 'image'
    },
    [SocialSystem.telegram]: {
      url: 'url',
      title: 'title'
    }
  }

  static urlNormalizer = (url: string): string => {
    return url.replace(/([^:]\/)\/+/g, '$1')
  }

  private paramsToQueryKeys = (system: SocialSystem) => {
    const queryKeys = Share.queryKeys[system]

    if (!queryKeys) {
      return {}
    }

    return Object.keys(queryKeys).reduce((acc, key: string) => {
      const param = queryKeys[key]
      const paramValue = this.params[param]

      if (paramValue) {
        return {
          ...acc,
          [key]: paramValue
        }
      }

      return acc
    }, {})
  }

  private objectToGetParams = (queryParams?: object) => {
    if (!queryParams) {
      return ''
    }

    const query = new URLSearchParams()

    for (const param in queryParams) {
      query.append(param, queryParams[param])
    }

    return `?${query.toString()}`
  }

  public get(system: SocialSystem): string {
    const url = Share.sitesLinks[system]
    const queryParams = this.paramsToQueryKeys(system)
    const query = this.objectToGetParams(queryParams)

    return Share.urlNormalizer(`${url}${query}`)
  }
}
