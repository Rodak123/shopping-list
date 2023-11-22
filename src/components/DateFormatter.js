const monthNames = [
  'Led',
  'Úno',
  'Bře',
  'Dub',
  'Kvě',
  'Čvn',
  'Čvc',
  'Srp',
  'Zář',
  'Říj',
  'Lis',
  'Pro',
];

const DateFormatter = ({ date }) => {
  const dateObj = new Date(date);

  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const year = dateObj.getFullYear();

  const formattedDate = `${day}. ${monthNames[month]} ${year}`;

  return formattedDate;
};

export default DateFormatter;
