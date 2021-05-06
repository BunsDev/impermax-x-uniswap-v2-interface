import React, { useContext } from 'react';
import { LanguageContext } from '../../contexts/Language';
import phrases from './translations';
import './index.scss';
import LendingPoolsRow from './LendingPoolsRow';
import PairAddressContext from '../../contexts/PairAddress';
import QuestionHelper from '../QuestionHelper';
import { usePairList } from '../../hooks/useData';
import { Spinner } from 'react-bootstrap';
import { useWallet } from 'use-wallet';
import { useWhitelistedPairs } from '../../hooks/useNetwork';

/**
 * Generate a searchable lending pools table.
 */
export function LendingPoolsTable() {
  const languages = useContext(LanguageContext);
  const language = languages.state.selected;
  const pairList = usePairList();
  const whitelistedPairs = useWhitelistedPairs();
  const t = (s: string) => (phrases[s][language]);

  if (!pairList) return (<div className="spinner-container">
    <Spinner animation="border" size="lg" />
  </div>);

  return (<div className="lending-pools-table">
    <div className="lending-pools-header row">
      <div className="col-7 col-md-5 col-lg-4">{t("Market")}</div>
      <div className="col d-none d-md-block">{t("Total Supply")}</div>
      <div className="col d-none d-md-block">{t("Total Borrowed")}</div>
      <div className="col d-none d-lg-block">{t("Supply APY")}</div>
      <div className="col d-none d-lg-block">{t("Borrow APY")}</div>
      <div className="col-5 col-md-3 col-lg-2 text-center">{t("Leveraged LP APY")} <QuestionHelper placement="left" text={"Based on last 7 days trading fees assuming a 5x leverage"} /></div>
    </div>
    {pairList.map((pair: string, key: any) => {
      return  whitelistedPairs.includes(pair) && (
        <PairAddressContext.Provider value={pair} key={key}>
          <LendingPoolsRow />
        </PairAddressContext.Provider>
      )
    })}
  </div>)
}