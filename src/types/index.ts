export type Session = string;

export type CreatePhononResponse = {
  index: number;
  pubKey: string;
};

export type Phonon = {
  index: number;
  pubKey: string;
  type: number;
  value: number;
};

export type PhononPair = {
  url: string;
};

export enum CurrencyType {
  BTC,
  ETH,
  OTHER,
}

export type DescriptorDTO = {
  index: number;
  currencyType: number;
  value: number;
};

export type PhononDTO = {
  sessionId: string;
  index: number;
};
