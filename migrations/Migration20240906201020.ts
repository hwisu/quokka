import { Migration } from '@mikro-orm/migrations';

export class Migration20240906201020 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table `cat` (`_id` integer not null primary key autoincrement, `hidden_field` integer not null);');
  }

}
