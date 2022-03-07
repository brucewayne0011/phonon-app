import bigDecimal from "js-big-decimal";
import { denominations } from "../constants/denominations";
import { PhononDTO } from "./../types/index";

export type DenominationAmount = {
  denomination: string;
  amount: number;
};

export const isGreaterThan = (num: string, x: number) => {
  const bigNum = new bigDecimal(num);
  return bigNum.compareTo(new bigDecimal(x)) > 0;
};

const isGreaterThanOrEqualTo = (number: bigDecimal, x: string) =>
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
      denomination: denomination.getValue(),
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
    .sort(sortPhonon)
    .filter((phonon) => {
      const denomination = new bigDecimal(phonon.Denomination);
      const amount = _total.subtract(denomination);
      if (isGreaterThanOrEqualTo(amount, "0")) {
        _total = amount;
        return true;
      }
      return false;
    });
};

export const sortPhonon = (a: PhononDTO, b: PhononDTO) => {
  const prev = new bigDecimal(a.Denomination);
  const cur = new bigDecimal(b.Denomination);
  return parseFloat(cur.subtract(prev).getValue());
};

export const sortDenominations = (_prev: string, _cur: string) => {
  console.log({ _prev, _cur });
  const prev = new bigDecimal(_prev);
  const cur = new bigDecimal(_cur);
  return prev.add(cur).getValue();
};

export const reduceDenominations = (_prev: string, _cur: string) => {
  console.log({ _prev, _cur });
  const prev = new bigDecimal(_prev);
  const cur = new bigDecimal(_cur);
  console.log({ prev: prev.getValue(), cur: cur.getValue() });
  const val = prev.add(cur);
  console.log({ val: val.getValue() });
  return val.getValue();
};
