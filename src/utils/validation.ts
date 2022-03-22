export const areFirstThreeCharsLessThan256 = (value) =>
  parseInt(value.substring(0, 3)) < 256;
