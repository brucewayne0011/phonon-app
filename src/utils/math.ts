import bigDecimal from "js-big-decimal";
import { denominations } from "../constants/denominations";
import { PhononDTO } from "./../types/index";

export type DenominationAmount = {
  denomination: number;
  amount: number;
};

const isGreaterThanOrEqualTo = (number: bigDecimal, x: number) =>
  number.compareTo(new bigDecimal(x)) > -1;

export const makeChange = (total: number) => {
  let _total = new bigDecimal(total);
  const isTotalAboveZero = () => _total.compareTo(new bigDecimal(0)) === 1;

  const denominationAmounts: DenominationAmount[] = denominations.map(
    (denomination) => ({
      denomination,
      amount: 0,
    })
  );
  let step = 0;
  while (isTotalAboveZero() && step < denominations.length) {
    const denomination = new bigDecimal(denominations[step]);
    const amount = _total.divide(denomination, 8).floor();
    _total = _total.subtract(denomination.multiply(amount));
    denominationAmounts[step] = {
      denomination: parseFloat(denomination.getValue()),
      amount: parseFloat(amount.getValue()),
    };
    step++;
  }
  if (isTotalAboveZero()) {
    console.error("Making change failed", _total.getValue());
  }
  return denominationAmounts.filter((x) => x.amount);
};

export const rollupChange = (denominations: DenominationAmount[]) => {
  return denominations.reduce((a, b) => {
    const prev = new bigDecimal(a);
    const amount = new bigDecimal(b.amount);
    const denom = new bigDecimal(b.denomination);
    const curr = denom.multiply(amount);
    return parseFloat(prev.add(curr).getValue());
  }, 0);
};

export const makeChangeWithPhonons = (total: number, phonons: PhononDTO[]) => {
  let _total = new bigDecimal(total);
  return phonons
    .filter((d) => isGreaterThanOrEqualTo(_total, d.Denomination))
    .sort((a, b) => b.Denomination - a.Denomination)
    .filter((phonon) => {
      const denomination = new bigDecimal(phonon.Denomination);
      const amount = _total.subtract(denomination);
      if (isGreaterThanOrEqualTo(amount, 0)) {
        _total = amount;
        return true;
      }
      return false;
    });
};
