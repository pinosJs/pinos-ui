export function validatePhone(value: string) {
  return /^[1]([3-9])[0-9]{9}$/.test(value)
}
