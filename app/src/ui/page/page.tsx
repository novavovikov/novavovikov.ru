import cn from 'classnames'
import React from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Container from '../container'
import SEO, { Props as SEOProps } from './seo'
import s from './page.module.css'
import Splash from '../splash/splash'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  preHeader?: React.ReactNode
  seoProps?: Partial<SEOProps>
  contentProps?: React.HTMLAttributes<HTMLElement>
  containerProps?: React.HTMLAttributes<HTMLDivElement>
}

export default function Page({
  className,
  title,
  preHeader,
  seoProps = {},
  contentProps = {},
  containerProps = {},
  children,
  ...restProps
}: Props) {
  const [mounted, setMounted] = React.useState<boolean>(false)

  React.useEffect(() => {
    setMounted(true)
  }, [mounted])

  return (
    <>
      <Splash hidden={mounted} />
      <SEO title={title} {...seoProps} />

      <div className={cn(s.Page, className)} {...restProps}>
        <Header />
        {preHeader}
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
