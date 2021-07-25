
import * as React from 'react';
import {
  useErrorHandler,
  withErrorBoundary
} from 'react-error-boundary';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import clsx from 'clsx';
import { useQuery } from 'react-query';

import Panel from 'components/Panel';
import ErrorFallback from 'components/ErrorFallback';
import formatNumberWithFixedDecimals from 'utils/helpers/format-number-with-fixed-decimals';
// ray test touch <<<
import xIMXDataFetcher, { X_IMX_DATA_FETCHER } from 'services/fetchers/x-imx-data-fetcher';
import { XImxData } from 'services/get-x-imx-data';
import getReservesDistributorData from 'services/get-reserves-distributor-data';
// ray test touch >>>

// TODO: not used for now
// import { formatUnits } from '@ethersproject/units';
// import { Contract } from '@ethersproject/contracts';
// import { IMX_ADDRESSES } from 'config/web3/contracts/imxes';
// import { X_IMX_ADDRESSES } from 'config/web3/contracts/x-imxes';
// import { RESERVES_DISTRIBUTOR_ADDRESSES } from 'config/web3/contracts/reserves-distributors';
// import ReservesDistributorJSON from 'abis/contracts/IReservesDistributor.json';
// import getERC20Contract from 'utils/helpers/web3/get-erc20-contract';
// const getXIMXAPY = async (chainID: number, library: Web3Provider) => {
//   const imxContract = getERC20Contract(IMX_ADDRESSES[chainID], library);
//   const bigReservesDistributorBalance = await imxContract.balanceOf(RESERVES_DISTRIBUTOR_ADDRESSES[chainID]);
//   const reservesDistributorBalance = parseFloat(formatUnits(bigReservesDistributorBalance));
//   const bigXImxBalance = await imxContract.balanceOf(X_IMX_ADDRESSES[chainID]);
//   const xImxBalance = parseFloat(formatUnits(bigXImxBalance));
//   const reservesDistributorContract =
//     new Contract(RESERVES_DISTRIBUTOR_ADDRESSES[chainID], ReservesDistributorJSON.abi, library);
//   const periodLength = await reservesDistributorContract.periodLength();
//   const dailyAPR = reservesDistributorBalance / periodLength * 3600 * 24 / xImxBalance;
//   return Math.pow(1 + dailyAPR, 365) - 1;
// };

const APYCard = ({
  className,
  ...rest
}: React.ComponentPropsWithRef<'div'>): JSX.Element => {
  const {
    chainId,
    active
  } = useWeb3React<Web3Provider>();

  const {
    isLoading: xIMXDataLoading,
    data: xIMXData,
    error: xIMXDataError
  } = useQuery<XImxData, Error>(
    [
      X_IMX_DATA_FETCHER,
      chainId
    ],
    xIMXDataFetcher,
    {
      enabled: chainId !== undefined
    }
  );
  useErrorHandler(xIMXDataError);

  React.useEffect(() => {
    if (!chainId) return;

    (async () => {
      try {
        // ray test touch <<<
        // Total IMX Distributed
        const reservesDistributorData = await getReservesDistributorData(chainId);
        const distributed = reservesDistributorData.distributed;
        console.log('ray : ***** [Total IMX Distributed] distributed => ', distributed);
        // ray test touch >>>
      } catch (error) {
        console.log('[APYCard useEffect] error.message => ', error.message);
      }
    })();
  }, [chainId]);

  let apyLabel;
  if (active) {
    if (xIMXDataLoading) {
      apyLabel = '-';
    } else {
      if (!xIMXData) {
        throw new Error('Something went wrong!');
      }

      const xIMXAPY = Math.pow(1 + parseFloat(xIMXData.dailyAPR), 365) - 1;
      const xIMXAPYInPercent = formatNumberWithFixedDecimals(xIMXAPY * 100, 2);
      apyLabel = `${xIMXAPYInPercent} %`;

      // ray test touch <<<
      // Total IMX Staked
      const totalBalance = xIMXData.totalBalance;
      console.log('ray : ***** [Total IMX Staked] totalBalance => ', totalBalance);
      // ray test touch >>>
    }
  } else {
    apyLabel = '-';
  }

  return (
    <Panel
      className={clsx(
        'px-6',
        'py-4',
        'flex',
        'justify-between',
        'items-center',
        'bg-impermaxJade-200',
        className
      )}
      {...rest}>
      <div
        className={clsx(
          'text-base',
          'font-medium'
        )}>
        Staking APY
      </div>
      <div
        className={clsx(
          'flex',
          'flex-col',
          'items-end',
          'space-y-1'
        )}>
        <span
          className={clsx(
            'font-bold',
            'text-2xl',
            'text-textPrimary'
          )}>
          {apyLabel}
        </span>
        <span
          className={clsx(
            'text-sm',
            'text-textSecondary',
            'font-medium'
          )}>
          Staking APY
        </span>
      </div>
    </Panel>
  );
};

export default withErrorBoundary(APYCard, {
  FallbackComponent: ErrorFallback,
  onReset: () => {
    window.location.reload();
  }
});
