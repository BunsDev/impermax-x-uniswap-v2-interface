
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { PoolTokenType } from 'impermax-router/interfaces';
import {
  useSupplyUSD,
  useTotalBorrowsUSD,
  useSupplyAPY,
  useBorrowAPY,
  useSymbol,
  useUniswapAPY,
  useFarmingAPY
} from 'hooks/useData';
import { useTokenIcon } from 'hooks/useUrlGenerator';
import {
  formatUSD,
  formatPercentage
} from 'utils/format';
import useLendingPoolURL from 'hooks/use-lending-pool-url';

const LEVERAGE = 5;

const LendingPoolsRow = (): JSX.Element => {
  const symbolA = useSymbol(PoolTokenType.BorrowableA);
  const symbolB = useSymbol(PoolTokenType.BorrowableB);
  const supplyUSDA = useSupplyUSD(PoolTokenType.BorrowableA);
  const supplyUSDB = useSupplyUSD(PoolTokenType.BorrowableB);
  const totalBorrowsUSDA = useTotalBorrowsUSD(PoolTokenType.BorrowableA);
  const totalBorrowsUSDB = useTotalBorrowsUSD(PoolTokenType.BorrowableB);
  const supplyAPYA = useSupplyAPY(PoolTokenType.BorrowableA);
  const supplyAPYB = useSupplyAPY(PoolTokenType.BorrowableB);
  const borrowAPYA = useBorrowAPY(PoolTokenType.BorrowableA);
  const borrowAPYB = useBorrowAPY(PoolTokenType.BorrowableB);
  const farmingPoolAPYA = useFarmingAPY(PoolTokenType.BorrowableA);
  const farmingPoolAPYB = useFarmingAPY(PoolTokenType.BorrowableB);
  const lendingPoolUrl = useLendingPoolURL();
  const tokenIconA = useTokenIcon(PoolTokenType.BorrowableA);
  const tokenIconB = useTokenIcon(PoolTokenType.BorrowableB);
  const uniAPY = useUniswapAPY();
  const averageAPY = (borrowAPYA + borrowAPYB - farmingPoolAPYA - farmingPoolAPYB) / 2;
  const leveragedAPY = uniAPY * LEVERAGE - averageAPY * (LEVERAGE - 1);

  return (
    <Link
      to={lendingPoolUrl}
      className='row lending-pools-row'>
      <div className='col-7 col-md-5 col-lg-4'>
        <div className='currency-name'>
          <div className='combined'>
            <div className='currency-overlapped'>
              <img
                className='inline-block'
                src={tokenIconA} />
              <img
                className='inline-block'
                src={tokenIconB} />
            </div>
            {symbolA}/{symbolB}
          </div>
          <div className='d-none d-md-block'>
            <div>
              <img
                className={clsx(
                  'currency-icon',
                  'inline-block'
                )}
                src={tokenIconA} />
              {symbolA}
            </div>
            <div>
              <img
                className={clsx(
                  'currency-icon',
                  'inline-block'
                )}
                src={tokenIconB} />
              {symbolB}
            </div>
          </div>
        </div>
      </div>
      <div className='col d-none d-md-block'>
        <div>{formatUSD(supplyUSDA)}</div>
        <div>{formatUSD(supplyUSDB)}</div>
      </div>
      <div className='col d-none d-md-block'>
        <div>{formatUSD(totalBorrowsUSDA)}</div>
        <div>{formatUSD(totalBorrowsUSDB)}</div>
      </div>
      <div className='col d-none d-lg-block'>
        <div>{formatPercentage(supplyAPYA)}</div>
        <div>{formatPercentage(supplyAPYB)}</div>
      </div>
      <div className='col d-none d-lg-block'>
        <div>{formatPercentage(borrowAPYA)}</div>
        <div>{formatPercentage(borrowAPYB)}</div>
      </div>
      <div className='col-5 col-md-3 col-lg-2 leveraged-apy'>
        <div>{formatPercentage(leveragedAPY)}</div>
      </div>
    </Link>
  );
};

export default LendingPoolsRow;
