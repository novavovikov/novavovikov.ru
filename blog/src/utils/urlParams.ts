interface Params {
  search: string
  prefix: string
}

const getParams = (params: Partial<Params>): Params => ({
  search: typeof window !== 'undefined' ? window.location.search : '',
  prefix: '',
  ...params
})

export const deleteFromUrlParams = (
  name: string,
  params: Partial<Params> = {}
) => {
  const { prefix, search } = getParams(params)
  const urlParams = new URLSearchParams(search)
  urlParams.delete(name)

  return `${prefix}?${urlParams.toString()}`
}

export const addToUrlParams = (
  name: string,
  value: string | number | boolean,
  params: Partial<Params> = {}
) => {
  const { prefix, search } = getParams(params)
  const urlParams = new URLSearchParams(search)
  urlParams.append(name, String(value))

  return `${prefix}?${urlParams.toString()}`
}

export const hasToUrlParams = (
  name: string,
  value: string,
  params: Pick<Params, 'search'>
) => {
  const { search } = getParams(params)
  const urlParams = new URLSearchParams(search)

  return urlParams.get(name) === value
}
