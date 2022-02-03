import { DenominationAmount, makeChange, rollupChange } from "./../index";
describe("change making", () => {
  test("should make change", () => {
    const mock: DenominationAmount[] = [
      { denomination: 100, amount: 1 },
      { denomination: 10, amount: 1 },
      { denomination: 20, amount: 1 },
      { denomination: 1, amount: 1 },
    ];

    expect(rollupChange(mock)).toBe(131);
  });
  test("should make change", () => {
    const mock: DenominationAmount[] = [
      { denomination: 10, amount: 1 },
      { denomination: 1, amount: 1 },
      { denomination: 0.1, amount: 1 },
      { denomination: 0.01, amount: 1 },
      { denomination: 0.001, amount: 2 },
      { denomination: 0.0001, amount: 1 },
    ];

    expect(makeChange(11.1121)).toStrictEqual(mock);
  });
});
