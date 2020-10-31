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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>NovaVovikov | Personal blog 🌈</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap"
          rel="stylesheet"
        />
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
