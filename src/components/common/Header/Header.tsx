import { useEffect, memo } from 'react';
import * as styled from './Header.styles';
import getGlobalCoinData from 'api/getGlobalCoinData';
import { useRecoilState, useRecoilValue } from 'recoil';
import { globalCoinState } from 'recoil/atoms/globalCoinAtoms';
import { exchangeRateState } from 'recoil/atoms/exchangeAtoms';
import { useTheme } from 'hooks';
import { ExchangeRateDisplay } from './ExchangeRateDisplay';
import { GlobalCoinLabel } from './GlobalCoinLabel';
import { HiSun, HiMoon } from 'react-icons/hi2';
import { DiGithubAlt } from 'react-icons/di';
import LogoDark from 'assets/images/Logo-Dark.svg';
import LogoLight from 'assets/images/Logo-Light.svg';

function Header() {
  const { theme, onChangeTheme } = useTheme();
  const [globalCoin, setGlobalCoin] = useRecoilState(globalCoinState);
  const exchangeRate = useRecoilValue(exchangeRateState);

  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGlobalCoinData();
        setGlobalCoin(data);
      } catch (error) {
        console.error('Error fetching global coin data:', error);
      }
    };

    fetchData();
  }, [setGlobalCoin]);

  const {
    coins_count,
    active_markets,
    total_mcap,
    mcap_change,
    total_volume,
    volume_change,
    btc_d,
  } = globalCoin[0] || {};

  return (
    <styled.HeaderContainer>
      <styled.Topbar>
        <styled.Inner>
          <ExchangeRateDisplay exchangeRate={exchangeRate} />
          <GlobalCoinLabel label="암호화폐" value={coins_count} />
          <GlobalCoinLabel label="거래소" value={active_markets} />
          <GlobalCoinLabel
            label="시가총액"
            value={total_mcap}
            change={mcap_change}
            isCurrency
            exchangeRate={exchangeRate}
          />
          <GlobalCoinLabel
            label="24시간 거래량"
            value={total_volume}
            change={volume_change}
            isCurrency
            exchangeRate={exchangeRate}
          />
          <GlobalCoinLabel label="BTC 점유율" value={btc_d} isPercentage />
        </styled.Inner>
      </styled.Topbar>
      <styled.HeaderWrapper>
        <styled.InnerSpaceBetween>
          <styled.Logo to="/">
            <img
              src={isDarkMode ? LogoDark : LogoLight}
              alt="logo"
              width="100"
              height="auto"
              loading="lazy"
            />
          </styled.Logo>
          <styled.BtnGroup>
            <a
              href="https://github.com/Hell-Study/Final-Project"
              target="_blank"
              rel="noopener noreferrer"
            >
              <styled.GithubButton>
                <DiGithubAlt />
              </styled.GithubButton>
            </a>
            <styled.SwitchButton
              $isDarkMode={isDarkMode}
              onClick={onChangeTheme}
            >
              {isDarkMode ? <HiMoon /> : <HiSun />}
            </styled.SwitchButton>
          </styled.BtnGroup>
        </styled.InnerSpaceBetween>
      </styled.HeaderWrapper>
    </styled.HeaderContainer>
  );
}

export default memo(Header);
