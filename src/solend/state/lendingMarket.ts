import { AccountInfo, PublicKey } from "@solana/web3.js";
import * as BufferLayout from "buffer-layout";
import * as Layout from "../utils/layout";

export interface LendingMarket {
  version: number;
  isInitialized: boolean;
  quoteTokenMint: PublicKey;
  tokenProgramId: PublicKey;
}

export const LendingMarketLayout: typeof BufferLayout.Structure =
  BufferLayout.struct([
    BufferLayout.u8("version"),
    BufferLayout.u8("bumpSeed"),
    Layout.publicKey("owner"),
    Layout.publicKey("quoteTokenMint"),
    Layout.publicKey("tokenProgramId"),
    Layout.publicKey("oracleProgramId"),
    Layout.publicKey("switchboardOracleProgramId"),

    BufferLayout.blob(128, "padding"),
  ]);

export const LENDING_MARKET_SIZE = LendingMarketLayout.span;

export const isLendingMarket = (info: AccountInfo<Buffer>) =>
  info.data.length === LendingMarketLayout.span;

export const parseLendingMarket = (
  pubkey: PublicKey,
  info: AccountInfo<Buffer>
) => {
  const buffer = Buffer.from(info.data);
  const lendingMarket = LendingMarketLayout.decode(buffer) as LendingMarket;

  const details = {
    pubkey,
    account: {
      ...info,
    },
    info: lendingMarket,
  };

  return details;
};
