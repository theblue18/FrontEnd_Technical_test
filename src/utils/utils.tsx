


export const getColorFromBrand = (category: string) => {
  switch (category) {
    case "Gucci":
      return "red"
    case "Chanel":
      return "green"
    case "Supreme":
      return "blue"
    case "Off-White":
      return "orange"
    default:
      return "pink"
  }
}

export const calculateDepositTimeSince = (dateString: string): string => {
  const now = new Date();
  const depositedDate = new Date(dateString);
  const diff = Math.abs(now.getTime() - depositedDate.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  const remainingMonths = months % 12;
  const remainingDays = days % 30;

  const pluralize = (value: number, singular: string, plural: string) =>
    value === 1 ? `${value} ${singular}` : `${value} ${plural}`;


  const parts = [];
  if (years > 0) parts.push(pluralize(years, "year", "years"));
  if (remainingMonths > 0) parts.push(pluralize(remainingMonths, "month", "months"));
  if (remainingDays > 0) parts.push(pluralize(remainingDays, "day", "days"));

  return `Deposited ${parts.join(", ")} ago`;

};


