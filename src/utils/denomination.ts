import { ethers } from "ethers";
import bigDecimal from "js-big-decimal";
import { Eth, Wei } from "../types";

export type Denomination = {
  getStr: () => string;
  getEth: () => string;
  getWei: () => string;
  getBn: () => bigDecimal;
};

export const ethToWei = (eth: Eth) => ethers.utils.parseEther(eth).toString();

export const weiToEth = (wei: Wei) => {
  if (wei === "NaN") return "0";
  const bnValue = ethers.BigNumber.from(wei);
  return ethers.utils.formatEther(bnValue);
};

export const ethToBn = (eth: Eth) => {
  return ethers.utils.parseEther(eth);
};
