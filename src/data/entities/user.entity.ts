import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  username!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  password!: string;
}
