import axios from 'axios';

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
}

export default async function getExchangeRate() {
  const koreaexim_authkey = process.env.REACT_APP_EXCHANGE_RATE_API_KEY;

  try {
    const date = new Date();
    let data: IExchangeRate[] = [];

    while (data.length === 0) {
      let formattedDate = formatDate(date);
      const response = await axios.get(
        `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${koreaexim_authkey}&searchdate=${formattedDate}&data=AP01`,
      );

      data = response.data;

      if (data.length === 0) {
        date.setDate(date.getDate() - 1);
        formattedDate = formatDate(date);
      }
    }

    const usdData = data.find(
      (entry: IExchangeRate) => entry.cur_unit === 'USD',
    );
    if (!usdData) {
      console.warn('USD exchange rate not found in the data.');
      return null;
    }

    const usd = usdData.kftc_deal_bas_r;
    const cleanedUsd = usd.replace(/,/g, '');

    return parseFloat(cleanedUsd);
  } catch (error) {
    console.error('환율 에러', error);
  }
}

interface IExchangeRate {
  bkpr: string;
  cur_nm: string;
  cur_unit: string;
  deal_bas_r: string;
  kftc_bkpr: string;
  kftc_deal_bas_r: string;
  result: number;
  ten_dd_efee_r: string;
  ttb: string;
  tts: string;
  yy_efee_r: string;
}
