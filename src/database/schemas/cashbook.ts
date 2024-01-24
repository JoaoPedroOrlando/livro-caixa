import { tableSchema } from '@nozbe/watermelondb';
export const cashbookSchema = tableSchema({
  name: 'cashbook',
  columns: [
    { name: 'description', type: 'string' }
  ]
});
