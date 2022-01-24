import { faBtc, faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

export const NETWORKS = [
  {
    icon: faQuestionCircle,
    ticker: "N/A",
    name: "None",
    textColor: "text-black",
  },
  {
    icon: faBtc,
    ticker: "BTC",
    name: "Bitcoin",
    textColor: "text-yellow-200",
  },
  {
    icon: faEthereum,
    ticker: "ETH",
    name: "Ethereum",
    textColor: "text-indigo-300",
  },
];
