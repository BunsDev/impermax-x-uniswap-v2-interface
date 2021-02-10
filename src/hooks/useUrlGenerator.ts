import { useWETH } from "./useNetwork";
import usePairAddress from "./usePairAddress";
import { PoolTokenType } from "../impermax-router/interfaces";
import usePoolToken from "./usePoolToken";
import { useUnderlyingAddress } from "./useData";

export function useLendingPoolUrl() : string {
  const uniswapV2PairAddress = usePairAddress();
  return "/lending-pool/" + uniswapV2PairAddress;
}

export function useTokenIcon(poolTokenTypeArg?: PoolTokenType) : string {
  const tokenAddress = useUnderlyingAddress(poolTokenTypeArg);
  return tokenAddress ? "/build/assets/icons/" + tokenAddress + ".svg" : "";
}

export function useAddLiquidityUrl() : string {
  const WETH = useWETH();
  const tokenAAddress = useUnderlyingAddress(PoolTokenType.BorrowableA);
  const tokenBAddress = useUnderlyingAddress(PoolTokenType.BorrowableB);
  const addressA = tokenAAddress == WETH ? "ETH" : tokenAAddress;
  const addressB = tokenBAddress == WETH ? "ETH" : tokenBAddress;
  return "https://app.uniswap.org/#/add/"+addressA+"/"+addressB;
}