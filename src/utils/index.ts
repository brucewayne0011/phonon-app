import { denominations } from "../constants/denominations";

export const makeChange = (total: number) => {
  const piles = denominations.map((denomination) => ({
    denomination,
    amount: 0,
  }));
  let step = 0;
  while (total > 0 && step < denominations.length) {
    const denomination = denominations[step];
    const amount = Math.floor(total / denomination);
    total -= denomination * amount;
    piles[step] = { denomination, amount };
    step++;
  }
  if (total > 0) {
    console.error("Making change failed", total);
  }
  return piles;
};
