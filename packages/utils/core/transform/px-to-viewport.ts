function toFixed(number: number, precision: number) {
  const multiplier = Math.pow(10, precision + 1)
  const wholeNumber = Math.floor(number * multiplier)
  return (Math.round(wholeNumber / 10) * 10) / multiplier
}

function createPxReplace(
  viewportWidth: number,
  minPixelValue: number,
  unitPrecision: number,
  viewportUnit: string
) {
  return function($0: string, $1: string) {
    if (!$1) return $0
    const pixels = Number.parseFloat($1)
    if (pixels <= minPixelValue) return $0

    const parsedVal = toFixed((pixels / viewportWidth) * 100, unitPrecision)
    return parsedVal === 0 ? '0' : parsedVal + viewportUnit
  }
}

export function transformPxToViewport(
  value: string,
  config?: {
    viewportWidth?: number
    minPixelValue?: number
    unitPrecision?: number
    viewportUnit?: string
  }
) {
  const {
    viewportWidth: vW,
    minPixelValue: mV,
    unitPrecision: uP,
    viewportUnit: vU
  } = config || {}

  const viewportWidth = vW ?? 375
  const minPixelValue = mV ?? 1
  const unitPrecision = uP ?? 8
  const viewportUnit = vU ?? 'vw'

  return value.replace(
    /(\d+)px/gi,
    createPxReplace(viewportWidth, minPixelValue, unitPrecision, viewportUnit)
  )
}
