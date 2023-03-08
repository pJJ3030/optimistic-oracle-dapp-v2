import type { Assertions, Requests } from "@shared/types";

export {
  FallbackProvider,
  JsonRpcProvider,
  JsonRpcSigner,
  Provider,
  Web3Provider,
} from "@ethersproject/providers";

export type Token = {
  chainId: number;
  tokenAddress: string;
  name: string;
  symbol: string;
  decimals: number;
};
export type Tokens = Token[];

export type Balance = {
  chainId: number;
  account: string;
  amount: string;
  tokenAddress: string;
};
export type Balances = Balance[];

export type Allowance = Balance & {
  spender: string;
};
export type Allowances = Allowance[];

export type Transaction = {
  id: string;
  state: "created" | "confirmed" | "submitted" | "error";
  error?: Error;
};
export type Transactions = Transaction[];

// This is the data transfer interface from client to view. Use this in a context or reducer to
// map state to whatever you need for display.
export type Handlers = {
  requests?: (requests: Requests) => void;
  assertions?: (assertions: Assertions) => void;
  transactions?: (transactions: Transactions) => void;
  tokens?: (tokens: Tokens) => void;
  balances?: (balances: Balances) => void;
  allowances?: (allowances: Allowances) => void;
  // errors array indexes into server list. use this to determine which servers are failing
  errors?: (errors: Error[]) => void;
};

export type Service = {
  tick: () => Promise<void>;
};

// this is the interface to implement a server, servers gather information about requests/assertions from any source
export type ServiceFactory = (handlers: Handlers) => Service;
export type ServiceFactories = ServiceFactory[];
