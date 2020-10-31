interface Forms {
  one: string
  two: string
  other: string
}

export function pluralizeText(count: number, { one, two, other }: Forms) {
  if (count === 1) {
    return one
  }

  if (count < 5) {
    return two
  }

  return other
}
