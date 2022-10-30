export const upperFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const handleNumber = (n: number) => {
  return n === null ? '-' : n.toString()
}
