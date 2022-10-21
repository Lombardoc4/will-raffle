import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type WinnerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RaffleEntryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Winner {
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly raffle_id?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Winner, WinnerMetaData>);
  static copyOf(source: Winner, mutator: (draft: MutableModel<Winner, WinnerMetaData>) => MutableModel<Winner, WinnerMetaData> | void): Winner;
}

export declare class RaffleEntry {
  readonly id: string;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly raffle_id?: string | null;
  readonly patreon?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<RaffleEntry, RaffleEntryMetaData>);
  static copyOf(source: RaffleEntry, mutator: (draft: MutableModel<RaffleEntry, RaffleEntryMetaData>) => MutableModel<RaffleEntry, RaffleEntryMetaData> | void): RaffleEntry;
}