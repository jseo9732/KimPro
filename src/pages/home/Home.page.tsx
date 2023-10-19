import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Table } from 'components/Table';
import { ChartRight } from 'components/ChartRight';
import { ChartLeft } from 'components/ChartLeft';
import { ChatBox } from 'components/ChatBox';
import { marketCodesState } from 'recoil/atoms/upbit';
import { DisplayBoard, ChartsWrapper, ChatButton } from './Home.styles';
import useFetchMarketCode from 'api/upbit/useFetchMarketCode';
import { modalIsOpenState } from 'recoil/atoms/upbit';

interface FetchedMCData {
  market: string;
  korean_name: string;
  english_name: string;
}

export const Home: React.FC = () => {
  const { isLoading, marketCodes: fetchedMC } = useFetchMarketCode();
  const [marketCodes, setMarketCodes] = useRecoilState(marketCodesState);
  const [modalIsOpen, setModalIsOpen] = useRecoilState(modalIsOpenState);

  const openModal = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    const MarketCodes_KRW = fetchedMC.filter((code: FetchedMCData) =>
      code.market.includes('KRW'),
    );
    setMarketCodes(MarketCodes_KRW);
  }, [fetchedMC]);

  return (
    <>
      <DisplayBoard>
        <ChartsWrapper>
          <ChartLeft />
          <ChartRight />
        </ChartsWrapper>
        <Table />
        <ChatBox />
      </DisplayBoard>
      <ChatButton onClick={openModal}>CHAT</ChatButton>
    </>
  );
};
