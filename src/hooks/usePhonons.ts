import { useParams } from "react-router";
import { useFetchPhononsQuery } from "../store/api";
import { reduceDenominations } from "./../utils/math";

export const usePhonons = () => {
  const { sessionId, networkId } = useParams<{
    sessionId: string;
    networkId: string;
  }>();
  const { data } = useFetchPhononsQuery({
    sessionId,
  });
  const phonons =
    data?.filter((item) => item.CurrencyType === parseInt(networkId)) ?? [];
  const total =
    phonons.map((p) => p.Denomination).reduce(reduceDenominations, "0") ?? 0;

  return { phonons, total };
};
