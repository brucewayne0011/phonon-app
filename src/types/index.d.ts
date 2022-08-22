type Session = {
  Id: string;
  Name?: string;
  Initialized: boolean;
  TerminalPaired: boolean;
  PinVerified: boolean;
};

type Eth = string | number;
type Wei = string | number;

type CreatePhononResponse = {
  index: number;
  pubKey: string;
};

type MinePhononResponse = {
  AttemptId: string;
};

type Phonon = {
  index: number;
  pubKey: string;
  type: number;
  value: number;
};

type ChainValue = {
  chainId: number;
  value: number | undefined;
};

type PhononPair = {
  url: string;
};

enum CurrencyType {
  BTC,
  ETH,
  OTHER,
}

type DescriptorDTO = {
  index: number;
  currencyType: number;
  value: number;
  sessionId: string;
};

type DepositRequest = {
  CurrencyType: number;
  Denominations: Wei[];
};

type DepositConfirmation = {
  Phonon: PhononDTO;
  ConfirmedOnChain: boolean;
  ConfirmedOnCard: boolean;
}[];

type PhononDTO = {
  KeyIndex: number;
  PubKey: string;
  Address: string;
  AddressType: number;
  SchemaVersion: number;
  ExtendedSchemaVersion: number;
  Denomination: string;
  CurrencyType: number;
  ChainID: number;
};

type RedeemPhononDTO = {
  P: PhononDTO;
  RedeemAddress: string;
};

enum MiningStatus {
  Inactive,
  Success,
  Active,
  Canceled,
  Error,
}

type PhononMiningAttemptItem = {
  Attempts: number;
  Status: string;
  TimeElapsed: number;
  StartTime: string;
  StopTime: string;
  AverageTime: number;
  KeyIndex: number;
  Hash: string;
};
interface PhononMiningAttempt {
  [currentAttemptId: string]: PhononMiningAttemptItem;
}

type PhononStatusItem = {
  Name: string;
  Stat: string;
  SubText: string;
};

type SendPhononDTO = PhononDTO[];

type SessionNames = {
  [key: string]: string | undefined;
};
