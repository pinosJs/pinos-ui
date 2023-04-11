export const generateRandom = (length: number, randomMap = '0123456789abcdef'): string => {
  let res = ''
  const randomMapLength = randomMap.length
  for (let j = 0; j < length; j++) {
    const randomNumber = Math.floor(Math.random() * (randomMapLength + 1))
    res += randomMap[Math.max(0, randomNumber - 1)]
  }
  return res
}
