
export const daysBetween = (date1, date2) => (
  Math.abs(+date1 - +date2) / (1000 * 60 * 60 * 24)
)
