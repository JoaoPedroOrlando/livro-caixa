import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export class Entry extends Model {
  static table = 'entry';

  @field('value')
  value!: number;

  @field('type')
  type!: string;

  @field('observation')
  observation!: string;

  @field('dtEntry')
  dtEntry!: number;

  @field('dtRecord')
  dtRecord!: number;
}
