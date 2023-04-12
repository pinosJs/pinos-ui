export function validateType(target: unknown, type: string) {
  if (type === 'NaN')
    return Number.isNaN(target)
  else
    return Object.prototype.toString.call(target) === `[object ${type}]`
}
