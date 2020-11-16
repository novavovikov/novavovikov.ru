interface Forms {
  one: string
  few: string
  other: string
}

export function pluralizeText(count: number, { one, few, other }: Forms) {
  if (count === 1) {
    return one
  }

  if (count < 5) {
    return few
  }

  return other
}
