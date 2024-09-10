import { Migration } from '@mikro-orm/migrations';

export class Migration20240910143546 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table `book` (`id` integer not null primary key autoincrement, `title` text not null, `author` text not null, `published_date` datetime not null);');

    this.addSql('create table `library_member` (`id` integer not null primary key autoincrement, `name` text not null, `membership_date` datetime not null);');

    this.addSql('create table `loan` (`id` integer not null primary key autoincrement, `book_id` integer not null, `borrower_id` integer not null, `loan_date` datetime not null, `due_date` datetime null, `return_date` datetime null, `reserved_by_id` integer null, `extension_count` integer not null default 0, `status` text not null default \'active\');');

    this.addSql('drop table if exists `cat`;');
    this.addSql('drop table if exists `rat`;');
  }

  override async down(): Promise<void> {
    // cat 테이블 재생성
    this.addSql('create table `cat` (`_id` integer not null primary key autoincrement, `created_at` datetime not null);');

    // rat 테이블 재생성 및 외래 키 관계 설정
    this.addSql('create table `rat` (`_id` integer not null primary key autoincrement, `killed_by_id` integer not null, `created_at` datetime not null, constraint `rat_killed_by_id_foreign` foreign key (`killed_by_id`) references `cat` (`_id`) on update cascade on delete cascade);');

    // loan, library_member, book 테이블 제거
    this.addSql('drop table if exists `loan`;');
    this.addSql('drop table if exists `library_member`;');
    this.addSql('drop table if exists `book`;');
  }
}
