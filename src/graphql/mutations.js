/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createRaffleEntry = /* GraphQL */ `
  mutation CreateRaffleEntry(
    $input: CreateRaffleEntryInput!
    $condition: ModelRaffleEntryConditionInput
  ) {
    createRaffleEntry(input: $input, condition: $condition) {
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
export const updateRaffleEntry = /* GraphQL */ `
  mutation UpdateRaffleEntry(
    $input: UpdateRaffleEntryInput!
    $condition: ModelRaffleEntryConditionInput
  ) {
    updateRaffleEntry(input: $input, condition: $condition) {
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
export const deleteRaffleEntry = /* GraphQL */ `
  mutation DeleteRaffleEntry(
    $input: DeleteRaffleEntryInput!
    $condition: ModelRaffleEntryConditionInput
  ) {
    deleteRaffleEntry(input: $input, condition: $condition) {
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
