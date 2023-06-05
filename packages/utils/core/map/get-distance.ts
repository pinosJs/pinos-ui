interface Point {
  lat: number
  lng: number
}

interface FormatConfig {
  formatCb?: (distance: number) => string
  fixed?: number
}
// https://github.com/chrisveness/geodesy/blob/master/latlon-ellipsoidal-vincenty.js

function toRadians(d: number) {
  const PI = Math.PI
  return (d * PI) / 180.0
}

/**
 * https://github.com/chrisveness/geodesy/blob/master/latlon-ellipsoidal-vincenty.js
 * @param {Object} lat1
 * @param {Object} lng1
 * @param {Object} lat2
 * @param {Object} lng2
 */
function getFlatternDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const EARTH_RADIUS = 6378137.0
  const f = toRadians((lat1 + lat2) / 2)
  const g = toRadians((lat1 - lat2) / 2)
  const l = toRadians((lng1 - lng2) / 2)

  let sg = Math.sin(g)
  let sl = Math.sin(l)
  let sf = Math.sin(f)

  const a = EARTH_RADIUS
  const fl = 1 / 298.257

  sg = sg * sg
  sl = sl * sl
  sf = sf * sf

  const s = sg * (1 - sl) + (1 - sf) * sl
  const c = (1 - sg) * (1 - sl) + sf * sl

  const w = Math.atan(Math.sqrt(s / c))
  const r = Math.sqrt(s * c) / w
  const d = 2 * w * a
  const h1 = (3 * r - 1) / 2 / c
  const h2 = (3 * r + 1) / 2 / s

  return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))
}

function getDistanceStr(distance: number, fixed = 1) {
  if (distance > 1000)
    return `${(distance / 1000).toFixed(fixed)}km`
  else
    return `${distance.toFixed(fixed)}m`
}

export function calcDistanceByPoint(startPoint: Point, endPoint: Point, formatConfig?: FormatConfig) {
  let distance = 0
  let distanceStr = ''
  const { formatCb, fixed = 1 } = formatConfig || {}
  const { lat: startLat, lng: startLng } = startPoint || {}
  const { lat: endLat, lng: endLng } = endPoint || {}
  if (startLat > 0 && startLng > 0 && endLat > 0 && endLng > 0) {
    distance = getFlatternDistance(
      Number.parseFloat(endLat.toString()),
      Number.parseFloat(endLng.toString()),
      Number.parseFloat(startLat.toString()),
      Number.parseFloat(startLng.toString())
    )
  }

  if (formatCb)
    distanceStr = formatCb(distance)
  else
    distanceStr = getDistanceStr(distance, fixed)

  return {
    distance,
    distanceStr
  }
}
