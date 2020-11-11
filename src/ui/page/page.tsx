import cn from 'classnames'
import React from 'react'
import Header from '../../components/header'
import ThemeProvider from '../../providers/theme'
import Footer from '../../components/footer'
import Container from '../container'
import SEO, { Props as SEOProps } from './seo'
import s from './page.module.css'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  seoProps?: Partial<SEOProps>
  contentProps?: React.HTMLAttributes<HTMLElement>
  containerProps?: React.HTMLAttributes<HTMLDivElement>
}

export default function Page(props: Props) {
  return (
    <ThemeProvider>
      <Content {...props} />
    </ThemeProvider>
  )
}

function Content({
  className,
  title,
  seoProps = {},
  contentProps = {},
  containerProps = {},
  children,
  ...restProps
}: Props) {
  return (
    <>
      <SEO title={title} {...seoProps} />

      <div className={cn(s.Page, className)} {...restProps}>
        <Header />
        <main
          {...contentProps}
          className={cn(s.Page__content, contentProps?.className)}>
          <Container {...containerProps}>
            {title && (
              <h2
                className={s.Page__title}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            )}
            {children}
          </Container>
        </main>
        <Footer />
      </div>
    </>
  )
}
