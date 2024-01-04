import { tableSchema } from '@nozbe/watermelondb';
export const entrySchema = tableSchema({
  name: 'entry',
  columns: [
    { name: 'value', type: 'number' },
    { name: 'type', type: 'string'},
    { name: 'observation', type: 'string'},
    { name: 'dtEntry', type: 'number' },
    { name: 'dtRecord', type: 'number'}
  ]
});
