import type { ChainId, ErrorMessage, OracleType } from "@shared/types";
import { parsePriceRequestGraphEntity } from "@shared/utils";
import type { Address } from "wagmi";
import type { Handlers, Service, ServiceFactory } from "../../../types";
import { getPriceRequests } from "./queries";

export type Config = {
  url: string;
  chainId: ChainId;
  address: string;
  type: OracleType;
  addErrorMessage: (message: ErrorMessage) => void;
};

export const Factory =
  (config: Config): ServiceFactory =>
  (handlers: Handlers): Service => {
    async function fetch({
      url,
      chainId,
      address,
      type,
      addErrorMessage,
    }: Config) {
      const requests = await getPriceRequests(
        url,
        chainId,
        type,
        addErrorMessage
      );
      return requests.map((request) =>
        parsePriceRequestGraphEntity(request, chainId, address as Address, type)
      );
    }
    async function tick() {
      if (handlers.requests) {
        handlers.requests(await fetch(config));
      }
    }

    return {
      tick,
    };
  };
