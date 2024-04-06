/**
   * Recebe number que representa um valor monetário
   * @param value do tipo number
   * @returns string no formato de moeda
*/
export const formatNumberToCurrencyStr = (value:number):string => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

/**
   * Recebe string e retorna valor formatado para moeda
   * @param value string que representa valores numéricos
   * @returns valor string para formato monetário
*/
export const formatStringToCurrencyStr = (value:string):string => {
    const numericValue = value.replace(/[^0-9]/g, '');
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(parseInt(numericValue) / 100);
}
