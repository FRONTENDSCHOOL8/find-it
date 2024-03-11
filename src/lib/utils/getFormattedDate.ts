const getFormattedDate = (dateString: string): string => {
  const dateParts = dateString.split(' ');
  const year = dateParts[0]?.replace('년', '') || '';
  const month = dateParts[1]?.replace('월', '').padStart(2, '0') || '';
  const day = dateParts[2]?.replace('일', '').padStart(2, '0') || '';
  return `${year}${month}${day}`;
};

export default getFormattedDate;
