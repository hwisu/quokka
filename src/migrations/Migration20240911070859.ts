import { Migration } from '@mikro-orm/migrations';

export class Migration20240911070859 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table `library_member` (`id` integer not null primary key autoincrement, `name` text not null, `membership_date` datetime not null);');

    this.addSql('create table `loan` (`id` integer not null primary key autoincrement, `book_id` integer not null, `borrower_id` integer not null, `loan_date` datetime not null, `due_date` datetime null, `return_date` datetime null, `reserved_by_id` integer null, `extension_count` integer not null default 0, `status` text not null default \'active\');');

    this.addSql('create table `publisher` (`id` integer not null primary key autoincrement, `name` text not null, `registration_number` text not null, `established_date` datetime not null);');

    this.addSql('create table `book` (`id` integer not null primary key autoincrement, `title` text not null, `authors` text not null, `published_date` datetime not null, `isbn` text not null, `translator` text null, `editor` text null, `reviewer` text null, `publisher_id` integer not null, constraint `book_publisher_id_foreign` foreign key(`publisher_id`) references `publisher`(`id`) on update cascade);');
    this.addSql('create unique index `book_isbn_unique` on `book` (`isbn`);');
    this.addSql('create index `book_publisher_id_index` on `book` (`publisher_id`);');
  }

}
