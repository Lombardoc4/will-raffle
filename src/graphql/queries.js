/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRaffleEntry = /* GraphQL */ `
  query GetRaffleEntry($id: ID!) {
    getRaffleEntry(id: $id) {
      id
      name
      email
      raffle_id
      patreon
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listRaffleEntries = /* GraphQL */ `
  query ListRaffleEntries(
    $filter: ModelRaffleEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRaffleEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        raffle_id
        patreon
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncRaffleEntries = /* GraphQL */ `
  query SyncRaffleEntries(
    $filter: ModelRaffleEntryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRaffleEntries(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        email
        raffle_id
        patreon
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
