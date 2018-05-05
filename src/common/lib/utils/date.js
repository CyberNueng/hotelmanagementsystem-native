import moment from 'moment'

export const getDateRange = (startDate, endDate) => {
  if (!moment.isMoment(startDate)) {
    startDate = moment(startDate)
  }

  if (!moment.isMoment(endDate)) {
    endDate = moment(endDate)
  }

  const dateRange = []

  for (let currentDate = startDate; currentDate < endDate; currentDate.add(1, 'days')) {
    dateRange.push(currentDate.clone())
  }

  return dateRange
}

export default { getDateRange }
