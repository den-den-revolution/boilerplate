import { Migration } from '@mikro-orm/migrations';

export class Migration20211101191637 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user" ("id" serial primary key, "username" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "password" varchar(255) not null);',
    );

    this.addSql(
      'create table "product" ("id" serial primary key, "title" varchar(255) not null, "description" varchar(255) not null, "price" int4 not null);',
    );
  }
}
