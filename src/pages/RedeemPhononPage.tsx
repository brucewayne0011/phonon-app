import React, { useState } from "react";
import { useParams } from "react-router";
import {
  RedeemPhononFormCustom,
  RedeemPhononFormCustomValues,
} from "../components/RedeemPhononFormCustom";
import {
  RedeemPhononFormSuggested,
  RedeemPhononFormSuggestedValues,
} from "../components/RedeemPhononFormSuggested";
import useNetwork from "../hooks/useNetwork";
import { usePhonons } from "../hooks/usePhonons";
import { useRedeemPhononMutation } from "../store/api";
import { PhononDTO } from "../types";
import { makeChangeWithPhonons } from "../utils/math";

const RedeemPhononPage: React.FC = () => {
  const { sessionId } = useParams<{
    sessionId: string;
  }>();
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [redeemPhonon] = useRedeemPhononMutation();
  const { network } = useNetwork();
  const { phonons } = usePhonons();

  const onSubmitSuggested = (data: RedeemPhononFormSuggestedValues) =>
    onSubmit(makeChangeWithPhonons(data.amount, phonons));

  const onSubmitCustomized = (data: RedeemPhononFormCustomValues) =>
    onSubmit(
      phonons.filter((p) => data.phononsToRedeem.some((d) => d === p.PubKey))
    );

  const onSubmit = (payload: PhononDTO[]) => {
    // setIsPending(true);
    if (payload.length)
      redeemPhonon({ payload, sessionId }).catch(console.error);
    console.log({ payload });
  };

  const handleCustomize = () => {
    setIsCustomizing(true);
  };

  const handleSuggest = () => {
    setIsCustomizing(false);
    // setInputValue(rollupChange(denominationAmounts));
  };

  return (
    <div>
      <p className="text-xl font-bold text-center text-gray-300 uppercase">
        Redeem {network.ticker}
      </p>
      {isCustomizing ? (
        <RedeemPhononFormCustom
          {...{ handleSuggest, onSubmit: onSubmitCustomized, isPending }}
        />
      ) : (
        <RedeemPhononFormSuggested
          {...{ handleCustomize, onSubmit: onSubmitSuggested, isPending }}
        />
      )}
    </div>
  );
};

export default RedeemPhononPage;
