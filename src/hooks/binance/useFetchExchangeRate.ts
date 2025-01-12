import getExchangeRate from 'api/getExchangeRate';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { exchangeRateState } from 'recoil/atoms/exchangeAtoms';

export const useFetchExchangeRate = () => {
  const [exchangeRate, setExchangeRate] = useRecoilState(exchangeRateState);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const usdExchangeRate = await getExchangeRate();
      if (usdExchangeRate) {
        setExchangeRate(usdExchangeRate);
      }
    };

    fetchExchangeRate();
  }, [setExchangeRate]);

  return { exchangeRate };
};
