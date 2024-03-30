import { isNotNullAndUndefined } from "./utils";

/**
   * Recebe Date e retorna uma string dd/mm/yyyy, para ser usado no params ou body da requisição
   * @param date classe Date
   * @returns data em string no formato dd/mm/yyyy
   */
export function formatDateToString(date: Date): string {
  if(isNotNullAndUndefined(date)){
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const res =  `${day}/${month}/${year}`;
    return res;
  }
  return;
}

/**
   * Recebe string no formato yyyy-mm-dd hh:min:sec e retorna string em dd/mm/yyyy
   * @param dateString data em string yyyy-mm-dd hh:min:sec
   * @returns data no formato dd/mm/yyyy
*/
export function formatStrDate(dateString: string): string {
  const parts = dateString.split(' ');
    if (parts.length !== 2) {
        throw new Error('Formato de data e hora inválido. Use yyyy-mm-dd hh:min:sec.');
    }

    const [datePart, timePart] = parts;

    const dateParts = datePart.split('-');
    if (dateParts.length !== 3) {
        throw new Error('Formato de data inválido. Use yyyy-mm-dd.');
    }
    const [year, month, day] = dateParts.map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        throw new Error('Formato de data inválido. Use yyyy-mm-dd.');
    }
    const timeParts = timePart.split(':');
    if (timeParts.length !== 3) {
        throw new Error('Formato de hora inválido. Use hh:min:sec.');
    }
    const [hour, min, sec] = timeParts.map(Number);
    if (isNaN(hour) || isNaN(min) || isNaN(sec)) {
        throw new Error('Formato de hora inválido. Use hh:min:sec.');
    }
    const data = new Date(year, month - 1, day, hour, min, sec);
    if (isNaN(data.getTime())) {
        throw new Error('Data e hora inválidas.');
    }

    const formatedDay = data.getDate().toString().padStart(2, '0');
    const formatedMonth = (data.getMonth() + 1).toString().padStart(2, '0');
    const formatedYear = data.getFullYear();

    return `${formatedDay}/${formatedMonth}/${formatedYear}`;
}
