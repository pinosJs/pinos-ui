import dayjs from 'dayjs'

export const formatDate = (
  date: Date | number | string | null,
  format = 'YYYY-MM-DD'
) => {
  if (!format)
    throw new Error('Please pass in the format attribute')

  if (!date)
    return ''

  return dayjs(date).format(format)
}

export const getDayJs = (date: Date | number | string | null) => {
  if (!date)
    throw new Error('date parameter cannot be null or undefined')

  return dayjs(date)
}
