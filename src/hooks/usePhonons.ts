import { useParams } from "react-router";
import { useFetchPhononsQuery } from "../store/api";

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
    phonons.map((p) => p.Denomination).reduce((prev, cur) => prev + cur, 0) ??
    0;

  return { phonons, total };
};
