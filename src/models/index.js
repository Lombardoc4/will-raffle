// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Winner, RaffleEntry } = initSchema(schema);

export {
  Winner,
  RaffleEntry
};