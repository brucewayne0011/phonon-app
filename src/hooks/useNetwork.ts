import { useParams } from "react-router";
import { NETWORKS } from "./../constants/networks";

const useNetwork = () => {
  const { networkId } = useParams<{
    networkId: string;
  }>();
  const _networkId = parseInt(networkId);
  const isNetworkIdValid = _networkId < NETWORKS.length && _networkId >= 0;
  if (isNetworkIdValid) {
    const network = NETWORKS[_networkId];
    if (network) return { network };
  }
  throw Error("No network found");
};

export default useNetwork;
