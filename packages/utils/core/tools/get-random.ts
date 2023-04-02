export const getRandom = (length: number): string => {
  let res = ''
  const randomMap = '0123456789abcdef'
  const randomMapLength = randomMap.length
  for (let j = 0; j < length; j++) {
    const randomNumber = Math.floor(Math.random() * (randomMapLength - 1)) + 1
    res += randomMap[randomNumber - 1]
  }
  return res
}
