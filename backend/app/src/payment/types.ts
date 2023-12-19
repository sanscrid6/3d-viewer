export type PaymentNotification = {
  webhookId: string;
  id: string;
  createdAt: Date;
  type: string;
  event: Event;
};

export type Event = {
  network: string;
  activity: Activity[];
};

export type Activity = {
  blockNum: string;
  hash: string;
  fromAddress: string;
  toAddress: string;
  value: number;
  erc721TokenId: null;
  erc1155Metadata: null;
  asset: string;
  category: string;
  rawContract: RawContract;
  typeTraceAddress: null;
  log: Log;
};

export type Log = {
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  logIndex: string;
  removed: boolean;
};

export type RawContract = {
  rawValue: string;
  address: string;
  decimals: number;
};

export type ExchangeResponse = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: null;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date;
  roi: Roi;
  last_updated: Date;
};

export type Roi = {
  times: number;
  currency: string;
  percentage: number;
};
