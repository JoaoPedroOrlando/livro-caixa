import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class CashBookModel extends Model {
  static table = 'cashbook';

  @field('description')
  description!: string;

}
