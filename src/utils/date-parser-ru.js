const weekDays = {
  mon: 'Понедельник',
  tue: 'вторник',
  wed: 'среда',
  thu: 'Четверг',
  fri: 'пятница',
  sat: 'суббота',
  sun: 'воскресенье'
}

const months = {
  jan: "Января", 
  feb: "Февраля",
  mar: "Марта",
  apr: "Апреля",
  may: "Мая",
  jun: "Июня",
  jul: "Июля", 
  aug: "Августа",
  sep: "Сентября",
  oct: "Октября",
  nov: "Ноября",
  dec: "Декабря" 
}

export default function dataParser(dateToParse){
  const [weekday, date, month, year, time] = new Date(Date.parse(dateToParse)).toUTCString().toLowerCase().split(' ');

  return `${date < 10? date%10 : date} ${months[month]} ${year} в ${time.slice(0, 5)}`
}