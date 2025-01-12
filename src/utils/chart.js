import dayjs from 'dayjs'

export const generateChart = (startDate, endDate) => {
  const days = dayjs(endDate).diff(dayjs(startDate), 'day') + 1
  return Array.from({ length: days }, (_, index) => ({
    date: dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
    value: Math.floor(Math.random() * 100),
  }))
}
