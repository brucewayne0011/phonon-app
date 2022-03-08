import { faBtc, faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

type Network = {
  icon: typeof faBtc;
  ticker: string;
  name: string;
  textColor: string;
  symbol: string;
};

export const NETWORKS: Network[] = [
  {
    icon: faQuestionCircle,
    ticker: "N/A",
    name: "None",
    textColor: "text-black",
    symbol: "$",
  },
  {
    icon: faBtc,
    ticker: "BTC",
    name: "Bitcoin",
    textColor: "text-yellow-200",
    symbol: "฿",
  },
  {
    icon: faEthereum,
    ticker: "ETH",
    name: "Ethereum",
    textColor: "text-indigo-300",
    symbol: "Ξ",
  },
];
