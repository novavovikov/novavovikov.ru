import React from 'react'

interface CommonProps<Type extends React.ElementType> {
  as?: Type
}

/** Default Component Props*/
export type DefaultComponentProps<
  Type extends React.ElementType,
  Props = {}
> = React.ComponentPropsWithRef<Type> & Props & CommonProps<Type>

/** Default Component with base props */
export default function DefaultComponent<
  Type extends React.ElementType,
  Props = {}
>(props: DefaultComponentProps<Type, Props>) {
  const { as: Component = React.Fragment, ...restProps } = props

  return <Component {...restProps} />
}
