/**
 * 填充字符串
 * @param value 原始字符串
 * @param startIndex 起始位置下标
 * @param endIndex 结束位置显下标
 * @param fullText 中间要隐藏的内容的填充值
 * @returns 隐藏后的字符串
 */
export const fillValue = (
  value: string,
  startIndex: number,
  endIndex: number,
  fullText = '****'
) => {
  const val = value.trim()
  const len = value.length
  if (len === 0)
    return ''

  const fillCount = endIndex - startIndex + 1

  if (startIndex < 0 || endIndex < 0)
    throw new Error('endIndex and startIndex are not allowed to set negative values')

  if (startIndex > endIndex)
    throw new Error('startIndex must be greater than endIndex')

  if (fillCount > len)
    throw new Error('The values of endIndex and startIndex have exceeded the fill range')

  const reg = new RegExp(
    `(.{${startIndex}}).{${fillCount}}(.{${len - 1 - endIndex}})`,
    'gi'
  )

  return val.replace(
    reg,
    fillCount === len ? `$1${fullText}` : `$1${fullText}$2`
  )
}
