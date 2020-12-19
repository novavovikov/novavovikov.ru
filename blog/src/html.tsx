import React from 'react'

interface Props {
  htmlAttributes: React.HTMLAttributes<HTMLElement>
  headComponents: React.ReactNode[]
  bodyAttributes: React.HTMLAttributes<HTMLBodyElement>
  preBodyComponents: React.ReactNode[]
  body: string
  postBodyComponents: React.ReactNode[]
}

export default function HTML({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  body,
  preBodyComponents,
  postBodyComponents
}: Props) {
  return (
    <html lang="ru" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="yandex-verification" content="18e79c247e8eca15" />
        <meta
          name="google-site-verification"
          content="lMVrK9msm4DyktPnXFyDqnpIZWoNeAlOu2Q3GSTVa1w"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>🧑‍💻 Developer articles</title>
        {headComponents}
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <div
          key="body"
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
      </body>
    </html>
  )
}
