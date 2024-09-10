import { Migration } from '@mikro-orm/migrations';

export class Migration20240906201903 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table `rat` (`_id` integer not null primary key autoincrement, `killed_by__id` integer not null, `created_at` datetime not null, constraint `rat_killed_by__id_foreign` foreign key(`killed_by__id`) references `cat`(`_id`) on update cascade);');
    this.addSql('create index `rat_killed_by__id_index` on `rat` (`killed_by__id`);');

    this.addSql('alter table `cat` drop column `hidden_field`;');

    this.addSql('alter table `cat` add column `created_at` datetime not null;');
  }

  override async down(): Promise<void> {
    // Reverse the creation of the `rat` table and index
    this.addSql('drop index `rat_killed_by__id_index`;');
    this.addSql('drop table if exists `rat`;');

    // Reverse the column modifications on `cat` table
    this.addSql('alter table `cat` drop column `created_at`;');
    this.addSql('alter table `cat` add column `hidden_field` integer not null;');
  }

}
